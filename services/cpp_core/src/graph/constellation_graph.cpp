#include "constellation_graph.hpp"

#include <fstream>
#include <nlohmann/json.hpp>
#include <random>
#include <regex>
#include <stdexcept>

using json = nlohmann::json;

void ConstellationGraph::LoadFromPythonGraph(const std::string& path) {
  std::ifstream file(path);
  if (!file.is_open()) {
    throw std::runtime_error("Failed to open graph file: " + path);
  }

  short_to_id_.clear();
  short_names_.clear();
  full_names_.clear();
  adj_.clear();

  std::vector<std::pair<std::string, std::vector<std::string>>> parsed_rows;
  std::string line;
  std::regex row_pattern(R"(^([A-Za-z]{3})\s*=\s*\[(.*)\]\s*$)");
  std::regex neighbor_pattern(R"('([^']+)')");
  std::smatch row_match;

  int id = 0;

  while (std::getline(file, line)) {
    if (!std::regex_match(line, row_match, row_pattern)) {
      continue;
    }

    const std::string name = row_match[1].str();
    const std::string raw_neighbors = row_match[2].str();

    std::vector<std::string> neighbors;
    for (std::sregex_iterator it(raw_neighbors.begin(), raw_neighbors.end(),
                                 neighbor_pattern),
                              end;
         it != end; ++it) {
      neighbors.push_back((*it)[1].str());
    }

    short_to_id_[name] = id++;
    short_names_.push_back(name);
    parsed_rows.push_back({name, neighbors});
  }

  adj_.resize(short_names_.size());

  for (const auto& [name, neighbors] : parsed_rows) {
    int from = short_to_id_[name];

    for (const auto& n : neighbors) {
      adj_[from].push_back(short_to_id_[n]);
    }
  }
}

void ConstellationGraph::LoadNames(const std::string& path) {
  std::ifstream file(path);
  if (!file.is_open()) {
    throw std::runtime_error("Failed to open names file: " + path);
  }

  json j;
  file >> j;

  full_names_.resize(short_names_.size());

  for (auto& [short_name, full_name] : j.items()) {
    if (!short_to_id_.count(short_name)) {
      continue;
    }

    int id = short_to_id_[short_name];
    full_names_[id] = full_name;
  }
}

int ConstellationGraph::GetId(const std::string& short_name) const {
  auto it = short_to_id_.find(short_name);
  return it == short_to_id_.end() ? -1 : it->second;
}

int ConstellationGraph::GetIdFromFull(const std::string& full_name) const {
  for (int i = 0; i < full_names_.size(); ++i) {
    if (full_names_[i] == full_name) return i;
  }
  return -1;
}

std::string ConstellationGraph::GetShortName(int id) const {
  return short_names_[id];
}

std::string ConstellationGraph::GetFullName(int id) const {
  return full_names_[id];
}

std::vector<int> ConstellationGraph::GetNeighbors(int id) const {
  return adj_[id];
}

bool ConstellationGraph::AreNeighbors(int a, int b) const {
  for (int x : adj_[a]) {
    if (x == b) return true;
  }
  return false;
}

int ConstellationGraph::GetRandomNode() const {
  static std::mt19937 gen(std::random_device{}());
  std::uniform_int_distribution<> dist(0, adj_.size() - 1);
  return dist(gen);
}
