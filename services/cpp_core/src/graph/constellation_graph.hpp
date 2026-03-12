#pragma once

#include <string>
#include <unordered_map>
#include <vector>

class ConstellationGraph {
 public:
  void LoadFromJson(const std::string& filename);

  int GetId(const std::string& name) const;

  const std::string& GetName(int id) const;

  const std::vector<int>& GetNeighbors(int id) const;

  bool AreNeighbors(int a, int b) const;

  int GetRandomNode() const;

 private:
  void AddConstellation(const std::string& name);

  void AddEdge(int a, int b);

 private:
  std::vector<std::string> names_;

  std::unordered_map<std::string, int> name_to_id_;

  std::vector<std::vector<int>> adj_;
};