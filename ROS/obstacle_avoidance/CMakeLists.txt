cmake_minimum_required(VERSION 2.8.3)
project(obstacle_avoidance)

add_compile_options(-std=c++11 -O3)

find_package(catkin REQUIRED COMPONENTS roscpp std_msgs geometry_msgs turtlesim)

catkin_package(CATKIN_DEPENDS roscpp std_msgs geometry_msgs turtlesim)

include_directories(${catkin_INCLUDE_DIRS})

add_executable(sonar_node src/sonar_node.cpp)
add_executable(hello_node src/subscribe_node.cpp)
add_executable(subscribe_node src/subscribe_node.cpp)
add_executable(tutorial_pub_node src/tutorial_pub_node.cpp)
add_executable(${PROJECT_NAME}_node src/tutorial_pub_sub_node.cpp)

set_target_properties(sonar_node PROPERTIES OUTPUT_NAME sonar PREFIX "")
set_target_properties(hello_node PROPERTIES OUTPUT_NAME hello PREFIX "")
set_target_properties(subscribe_node PROPERTIES OUTPUT_NAME subscribe PREFIX "")
set_target_properties(tutorial_pub_node PROPERTIES OUTPUT_NAME tutorial_pub PREFIX "")
set_target_properties(${PROJECT_NAME}_node PROPERTIES OUTPUT_NAME ${PROJECT_NAME} PREFIX "")

add_dependencies(sonar_node ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})
add_dependencies(hello_node ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})
add_dependencies(subscribe_node ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})
add_dependencies(tutorial_pub_node ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})
add_dependencies(${PROJECT_NAME}_node ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})

target_link_libraries(sonar_node ${catkin_LIBRARIES})
target_link_libraries(hello_node ${catkin_LIBRARIES})
target_link_libraries(subscribe_node ${catkin_LIBRARIES})
target_link_libraries(tutorial_pub_node ${catkin_LIBRARIES})
target_link_libraries(${PROJECT_NAME}_node ${catkin_LIBRARIES})

