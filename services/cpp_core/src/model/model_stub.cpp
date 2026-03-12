#include "model_stub.hpp"

#include <cstdlib>

int ModelStub::MakeMove(int current, const std::vector<int>& neighbors,
                        int finish) {
  if (neighbors.empty()) return -1;

  int index = rand() % neighbors.size();

  return neighbors[index];
}