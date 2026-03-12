cmake_minimum_required(VERSION 3.16)

project(constellation_game)

set(CMAKE_CXX_STANDARD 17)

find_package(nlohmann_json REQUIRED)

add_executable(constellation_game
    src/main.cpp
    src/engine/game_engine.cpp
    src/graph/constellation_graph.cpp
    src/model/model_stub.cpp
    src/frontend/frontend_adapter.cpp
)

target_include_directories(constellation_game PRIVATE src)

target_link_libraries(constellation_game PRIVATE nlohmann_json::nlohmann_json)

file(COPY data DESTINATION ${CMAKE_BINARY_DIR})