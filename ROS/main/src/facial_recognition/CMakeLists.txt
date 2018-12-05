cmake_minimum_required(VERSION 2.8.3)
project(facial_recognition)

find_package(catkin REQUIRED COMPONENTS
  cv_bridge
  image_transport
  roscpp
  rospy
  sensor_msgs
  std_msgs
)

catkin_package(
#  INCLUDE_DIRS include
 LIBRARIES opencv_test
 CATKIN_DEPENDS cv_bridge image_transport roscpp rospy sensor_msgs std_msgs
#  DEPENDS system_lib
)

###########
## Build ##
###########

## Specify additional locations of header files
## Your package locations should be listed before other locations
include_directories(
#  include
  ${OpenCV_DATA_DIRS}
  ${OpenCV_INCLUDE_DIRS}
  ${catkin_INCLUDE_DIRS}
  ${OPENNI2_INCLUDE}
)

# add_executable(${PROJECT_NAME} src/kinect_face_detect.py)
# target_link_libraries(${PROJECT_NAME}
#  ${OpenCV_LIBRARIES}
#	${catkin_LIBRARIES}
#	-lOpenNI2
# )

# link_directories(${OPENNI2_REDIST})
