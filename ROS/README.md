# Graph command
* rosrun rqt_tf_tree rqt_tf_tree
* rosrun rqt_graph rqt_graph
* roswtf

# Make python executable
To make python package executable, run 
```
$ chmod u+x opencv-test/src/kinect_face_detect.py
```

Install dlib
```
$ sudo apt-get install python-pip
$ pip install dlib
```

Install freenect
```
$ sudo apt-get install freenect
$ sudo apt-get install python-freenect
```

# HOW TO RUN ROBOT 
* Find USB port with ```dmesg | grep tty```
* Give permissions with ```sudo chmod 777 -R /dev/ttyUSB0```
* catkin_make in directory, e.g. motorControl
* launch file, e.g. roslaunch simple_navigation_goals subscribe.launch
# Notes to self
* if moving to a different directory, remove build and delevel files before running catkin_make
* new cpp file -> add to cmake, add to launch file, catkin_make
* source files in -> cd /opt/ros/kinetic/include
* for custom messages - http://wiki.ros.org/ROS/Tutorials/CreatingMsgAndSrv

# Navigation
* [Simple tutorial](http://wiki.ros.org/navigation/Tutorials/SendingSimpleGoals)
* sudo apt install ros-kinetic-navigation for navigation
* roslaunch simple_navigation_goals nav.launch
* Install the tf package to run ros navigation stack 
```
sudo apt-get install ros-kinetic-tf*
```

# nav2d package
```
sudo apt-get install ros-kinetic-nav2d
```

Currently not sure how to 
# Add to bashRC - replace second with directory
* source /opt/ros/kinetic/setup.bash
* source ~/Programming/HCR2018/ROS/catkin_ws/devel/setup.bash
* source devel/setup.bash

 # Commands to connect to robot
* sudo chmod 777 -R /dev/ttyUSB0   - give permission for usb
* rosparam set /p2os/port /dev/ttyUSB0 
* rosrun p2os_driver p2os_driver
* roslaunch p3at_teleop p3at_teleop.launch rviz:=false
* dmesg | grep tty
* roslaunch simple_navigation_goals subscribe.launch
* roslaunch robot_server_interface robot_server_interface.launch
 # Useful ROS commands
 ## Publish/subscribe tools
 * rosnode list
 * rosnode info /some_node
 * rostopic list
 * rostopic info /some_topic
 * rostopic echo /some_topic
 * rostopic pub /some_topic msg/MessageType "data:value" 

# P2OS_driver meanings
* AIO - The aio interface provides access to an analog I/O device.

# Troubleshoot
If you see the following error:
* fatal error: custom_msgs/robotInfo.h: No such file or directory \[FIXED\]
  * \[UPDATE\] Add dependencies on the CMakeLists.txt with the following command:
    ```
    add_dependencies([package_name] [msg_package_name]_generate_messages_cpp)
    ```
    Replace \[package_name\] with the package that uses the custom message, and \[msg_package_name\] with the custom message package name.
  * This is due to the custom_msgs not compiled before it is used. Therefore, compile it first by running the following command
    ```
    $ catkin_make --pkg custom_msgs
    ```
  * You can fix the same error if you face same error for socket_msg/socketMsg.h
* qmake: could not exec '/usr/lib/x86_64-linux-gnu/qt4/bin/qmake': No such file or directory
CMake Error at /usr/share/cmake-3.5/Modules/FindQt4.cmake:1326 (message):
```
sudo apt-get install qt-sdk
```