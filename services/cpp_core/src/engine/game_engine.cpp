#include "game_engine.hpp"

#include <iostream>

GameEngine::GameEngine(ConstellationGraph graph) : graph_(graph) {}

void GameEngine::InitGame() {
  state_.start = graph_.GetRandomNode();

  do {
    state_.finish = graph_.GetRandomNode();
  } while (state_.finish == state_.start ||
           graph_.AreNeighbors(state_.start, state_.finish));

  state_.player_pos = state_.start;
  state_.model_pos = state_.start;

  state_.visited.insert(state_.start);

  state_.player_path.push_back(state_.start);
  state_.model_path.push_back(state_.start);
}

void GameEngine::Run() {
  frontend_.SendState(state_, graph_);

  while (!state_.game_over) {
    PlayerTurn();

    if (state_.game_over) break;

    ModelTurn();

    CheckGameOver();

    frontend_.SendState(state_, graph_);
  }

  frontend_.SendResult(state_, graph_);
}

void GameEngine::PlayerTurn() {
  while (true) {
    std::string name;

    std::cin >> name;

    int move = graph_.GetId(name);

    if (move == -1) {
      std::cout << "Unknown constellation\n";
      continue;
    }

    if (!ValidateMove(state_.player_pos, move)) {
      std::cout << "Not a neighbor\n";
      continue;
    }

    if (state_.visited.count(move)) {
      state_.player_lives--;
      std::cout << "Already visited\n";
      return;
    }

    state_.player_pos = move;

    state_.player_path.push_back(move);

    state_.visited.insert(move);

    return;
  }
}

void GameEngine::ModelTurn() {
  auto neighbors = graph_.GetNeighbors(state_.model_pos);

  int move = model_.MakeMove(state_.model_pos, neighbors, state_.finish);

  if (move == -1) {
    state_.model_lives--;
    return;
  }

  if (!ValidateMove(state_.model_pos, move)) {
    state_.model_lives--;
    return;
  }

  if (state_.visited.count(move)) {
    state_.model_lives--;
    return;
  }

  state_.model_pos = move;

  state_.model_path.push_back(move);

  state_.visited.insert(move);
}

bool GameEngine::ValidateMove(int from, int to) {
  if (to < 0) return false;

  return graph_.AreNeighbors(from, to);
}

bool GameEngine::IsDeadEnd(int node) {
  for (int n : graph_.GetNeighbors(node)) {
    if (!state_.visited.count(n)) return false;
  }

  return true;
}

void GameEngine::CheckGameOver() {
  if (state_.player_pos == state_.finish) state_.game_over = true;

  if (state_.model_pos == state_.finish) state_.game_over = true;

  if (state_.player_lives <= 0) state_.game_over = true;

  if (state_.model_lives <= 0) state_.game_over = true;

  if (IsDeadEnd(state_.player_pos)) state_.game_over = true;

  if (IsDeadEnd(state_.model_pos)) state_.game_over = true;
}