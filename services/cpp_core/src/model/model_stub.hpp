#pragma once

#include <vector>

class ModelStub {
 public:
  int MakeMove(int current, const std::vector<int>& neighbors, int finish);
};