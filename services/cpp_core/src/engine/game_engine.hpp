#pragma once

#include "../frontend/frontend_adapter.hpp"
#include "../graph/constellation_graph.hpp"
#include "../model/model_stub.hpp"
#include "../state/game_state.hpp"

class GameEngine {
 public:
  GameEngine(ConstellationGraph graph);

  void InitGame();

  void Run();

 private:
  void PlayerTurn();

  void ModelTurn();

  bool ValidateMove(int from, int to);

  bool IsDeadEnd(int node);

  void CheckGameOver();

 private:
  ConstellationGraph graph_;

  GameState state_;

  ModelStub model_;

  FrontendAdapter frontend_;
};