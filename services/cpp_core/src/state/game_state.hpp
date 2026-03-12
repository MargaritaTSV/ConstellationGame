#pragma once

#include <unordered_set>
#include <vector>

struct GameState {
  int start;
  int finish;

  int player_pos;
  int model_pos;

  int player_lives = 3;
  int model_lives = 3;

  std::vector<int> player_path;
  std::vector<int> model_path;

  std::unordered_set<int> visited;

  bool game_over = false;
};