# ROS code here
This is the repository for ROS

# Notes to self
* if moving to a different directory, remove build and delevel files before running catkin_make
* new cpp file -> add to cmake, add to launch file, catkin_make
# Navigation
* [Simple tutorial](http://wiki.ros.org/navigation/Tutorials/SendingSimpleGoals)
* sudo apt install ros-kinetic-navigationfor navigation
* roslaunch simple_navigation_goals nav.launch

Currently not sure how to 
# Add to bashRC - replace second with directory
* source /opt/ros/kinetic/setup.bash
* source ~/Programming/HCR2018/ROS/catkin_ws/devel/setup.bash
* source devel/setup.bash

 # Commands to connect to robot
* sudo chmod 777 -R /dev/ttyUSB0 
* rosparam set /p2os/port /dev/ttyUSB0 
* rosrun p2os_driver p2os_driver
* roslaunch p3at_teleop p3at_teleop.launch rviz:=false
* dmesg | grep tty
 * roslaunch simple_navigation_goals subscribe.launch

 # Useful ROS commands
 ## Publish/subscribe tools
 * rosnode list
 * rosnode info /some_node
 * rostopic list
 * rostopic info /some_topic
 * rostopic echo /some_topic
 * rostopic pub /some_topic msg/MessageType "data:value" 