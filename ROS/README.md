# ROS code here
This is the repository for ROS

# Add to bashRC - replace second with directory
* source /opt/ros/kinetic/setup.bash
* source ~/Programming/HCR2018/ROS/catkin_ws/devel/setup.bash

 # Commands to connect to robot
* sudo chmod 777 -R /dev/ttyUSB0 
* rosparam set /p2os/port /dev/ttyUSB0 
* rosrun p2os_driver p2os_driver
* roslaunch p3at_teleop p3at_teleop.launch rviz:=false
* dmesg | grep tty