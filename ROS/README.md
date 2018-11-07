# Problems
Currently does not work on the given human laptop, 
...launch is neither a launch file ....
* could be to do with ROS
# HOW TO RUN ROBOT 
* Find USB port with ```dmesg | grep tty```
* Give permissions with ```sudo chmod 777 -R /dev/ttyUSB0```
* catkin_make in directory, e.g. motorControl
* launch file, e.g. roslaunch simple_navigation_goals subscribe.launch
# Notes to self
* if moving to a different directory, remove build and delevel files before running catkin_make
* new cpp file -> add to cmake, add to launch file, catkin_make
# Navigation
* [Simple tutorial](http://wiki.ros.org/navigation/Tutorials/SendingSimpleGoals)
* sudo apt install ros-kinetic-navigation for navigation
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