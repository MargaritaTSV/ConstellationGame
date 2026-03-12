#include <ctime>

#include "engine/game_engine.hpp"
#include "graph/constellation_graph.hpp"

int main() {
  srand(time(nullptr));
  ConstellationGraph graph;

  graph.LoadFromJson("data/constellations_graph.json");

  GameEngine engine(graph);

  engine.InitGame();

  engine.Run();
}