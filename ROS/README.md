# Instruction
The exact instruction to run the ROS can be found on [ROS official site](http://wiki.ros.org/ROS/Tutorials). This directory will list down the errors encountered during development and the solutions. Essentially, to successfully run the all the packages developed, follow the steps:
* Make sure you are in the directory `ROS/main`.
* Make sure you installed all the required packages, see [Packages Required](#packages-required). 
* Run the command `$ catkin_make`, this will compile all the packages and dependencies required. 
* Run the command `$ . setupRobot.bash` to source the newly compiled ROS. Alternatively, do `$ source devel/setup.bash`.
* Make sure to set Python scripts in `src/facial_recognition/src/kinect_face_detect.py` and `src/py_socket/src/py_client.py` executable by following section [Make Python Executable](#make-python-executable). 
* Run the command `$ roslaunch nav2d_tutorials nav2d.launch`. This will launch all packges developed in this repository. 

# Packages Required
* `$ sudo apt-get install python-pip`
* `$ sudo python -m pip install socketIO_client_nexus`
* `$ pip install dlib`
* `$ sudo apt-get install freenect`
* `$ sudo apt-get install python-freenect`
* `$ sudo apt-get install cv2`
* `$ sudo apt-get install ros-kinetic-tf*`
* `$ sudo apt-get install ros-kinetic-nav2d`
* `$ sudo apt-get install qt-sdk`

There is a possibility that some packages are missing in this instruction. If such case happens, please install the required packages mentioned in the Error Log when executing `$ catkin_make`.

# Make Python Executable
To make python package executable, run 
* `$ chmod u+x src/py_socket/src/py_client.py`
* `$ chmod u+x src/facial_recognition/src/kinect_face_detect.py`

# Useful commands and Troubleshoot
## Graph command
* rosrun rqt_tf_tree rqt_tf_tree
* rosrun rqt_graph rqt_graph
* roswtf

## Publish/subscribe tools
* rosnode list
* rosnode info /some_node
* rostopic list
* rostopic info /some_topic
* rostopic echo /some_topic
* rostopic pub /some_topic msg/MessageType "data:value" 

## How to navigate robot using keyboard
* Find USB port with ```dmesg | grep tty```
* Give permissions with ```sudo chmod 777 -R /dev/ttyUSB*``` where the * varies depending on the ports you connect the robot to
* catkin_make in directory, e.g. motorControl
* launch file, e.g. roslaunch simple_navigation_goals subscribe.launch

## Note to self
* If moving to a different directory, remove build and delevel files before running catkin_make
* new cpp file -> add to cmake, add to launch file, catkin_make
* source files in -> cd /opt/ros/kinetic/include
* For custom messages, follow http://wiki.ros.org/ROS/Tutorials/CreatingMsgAndSrv

## Navigation using Navigation Stack (NOT USED)
Navigation stack is attempted in this project, but due to time constraint it wasn't configured and working properly, therefore `nav2d` is used. 
* [Simple tutorial](http://wiki.ros.org/navigation/Tutorials/SendingSimpleGoals)
* sudo apt install ros-kinetic-navigation for navigation
* roslaunch simple_navigation_goals nav.launch
* Install the tf package to run ros navigation stack 

```
sudo apt-get install ros-kinetic-tf*
```

## nav2d package
[http://wiki.ros.org/nav2d_navigator?distro=kinetic](info)
```
sudo apt-get install ros-kinetic-nav2d
```
* navigation_goal_distance 

## Commands to connect to robot
* sudo chmod 777 -R /dev/ttyUSB0   - give permission for usb
* rosparam set /p2os/port /dev/ttyUSB0 
* rosrun p2os_driver p2os_driver
* roslaunch p3at_teleop p3at_teleop.launch rviz:=false
* dmesg | grep tty
* roslaunch simple_navigation_goals subscribe.launch
* roslaunch robot_server_interface robot_server_interface.launch

## P2OS_driver meanings
* AIO - The aio interface provides access to an analog I/O device.

## Miscellaneous
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
