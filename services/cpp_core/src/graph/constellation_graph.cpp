#include "constellation_graph.hpp"

#include <algorithm>
#include <cstdlib>
#include <fstream>
#include <iostream>
#include <nlohmann/json.hpp>

using json = nlohmann::json;

void ConstellationGraph::LoadFromJson(const std::string& filename) {
  std::ifstream file(filename);

  json data;

  file >> data;

  for (auto& [name, _] : data.items()) {
    AddConstellation(name);
  }

  for (auto& [name, neighbors] : data.items()) {
    int id = GetId(name);

    for (auto& n : neighbors) {
      int nid = GetId(n);

      if (nid == -1) {
        continue;
      }

      AddEdge(id, nid);
    }
  }
}

void ConstellationGraph::AddConstellation(const std::string& name) {
  name_to_id_[name] = names_.size();

  names_.push_back(name);

  adj_.push_back({});
}

void ConstellationGraph::AddEdge(int a, int b) {
  adj_[a].push_back(b);
  adj_[b].push_back(a);
}
int ConstellationGraph::GetId(const std::string& name) const {
  auto it = name_to_id_.find(name);

  if (it == name_to_id_.end()) return -1;

  return it->second;
}

const std::string& ConstellationGraph::GetName(int id) const {
  return names_[id];
}

const std::vector<int>& ConstellationGraph::GetNeighbors(int id) const {
  return adj_[id];
}

bool ConstellationGraph::AreNeighbors(int a, int b) const {
  const auto& neighbors = adj_[a];

  return std::find(neighbors.begin(), neighbors.end(), b) != neighbors.end();
}

int ConstellationGraph::GetRandomNode() const { return rand() % names_.size(); }