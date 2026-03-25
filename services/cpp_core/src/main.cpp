#include "api/http_server.hpp"
#include "engine/game_engine.hpp"
#include "graph/constellation_graph.hpp"

int main() {
  ConstellationGraph graph;

  graph.LoadFromPythonGraph("data/graph.py");
  graph.LoadNames("data/names.json");

  GameEngine engine(graph);
  HttpServer server(engine);

  server.Run(8080);

  return 0;
}
