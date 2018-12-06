cmake_minimum_required(VERSION 2.8.3)
project(obstacle_avoidance)

add_compile_options(-std=c++11 -O3)

find_package(catkin REQUIRED COMPONENTS roscpp std_msgs geometry_msgs )

catkin_package(CATKIN_DEPENDS roscpp std_msgs geometry_msgs )

include_directories(${catkin_INCLUDE_DIRS})

add_executable(sonar_node src/sonar_node.cpp)


set_target_properties(sonar_node PROPERTIES OUTPUT_NAME sonar PREFIX "")


add_dependencies(sonar_node ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})


target_link_libraries(sonar_node ${catkin_LIBRARIES})


