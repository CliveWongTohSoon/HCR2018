# Human-Centered Robotics (2018-2019)
This repository is part of Imperial College EE4-60 Human-Centered Robotics (2018-2019) course. The goal of this project is to build a delivery robot controlled over the cloud. The robot will be able to navigate to a preset location via the web and contains a locker to store items for delivery. The architecture of the system is highlighted in the report attached (Architecture 1) and is shown below. Several technologies are used to make this project possible, namely Robotic Operating System (ROS) for robot control, Reactjs for frontend, Nodejs for backend, and Python on Raspberry Pi for storage control. 

![hcr-architecure1](https://user-images.githubusercontent.com/2521843/50316400-70f14400-04f1-11e9-8129-d8463785d404.png)


## Equipment Used
The robot used for this project is Pioneer 3-AT (P3AT), and the combination of Arduino and Raspberry Pi 3B+ are used as the processing unit of the storage designed. For the storage material, Laser Plywood is used. Normal DC motor is used for the locking mechanism, however Stepper Motor can be used as well. The circuit for the locking mechanism can be found in the report attached. RPlidar sensor is used as the main sensor for navigation and mapping the environment. 

## Environment Required
* Ubuntu 16.04 is needed on the production machine to run the kinect-ROS. Other OS is supported as well, for details please refer to ROS official [site](http://wiki.ros.org/kinetic/Installation). 
* Node (and npm) must be installed to run the client and server. It is suggested to use nvm to manage the node version. The recommended Node version is at least 8 and above. The node version used for this project is 11.4.0. 
* Python3 and above is recommended. However, it should be noted that by default ROS uses Python2.7. Extra configuration needs to be done, i.e changing the header of the python file to use python3 instead of python. For more information, please refer to the link [here](https://answers.ros.org/question/237613/how-to-define-ros-kinetic-to-use-python3-instead-of-python27/). It is recommended to use virtual environment for setting up the Python environment, such as using pipenv or virtualenv. 
* For the program to work, it is required to serve the client and server on the cloud. The instruction to serve Nodejs app on AWS EC2 instance can be found [here](https://hackernoon.com/tutorial-creating-and-managing-a-node-js-server-on-aws-part-1-d67367ac5171). 

# Overview
This repository contains 5 main repositories, namely client, mock_ROS, raspberry_client, ROS and server. The directories client, server and ROS are self-explanatory. The directory mock_ROS contains the code that runs the logic desired without the need of executing the ROS and Raspberry driver, whereas the directory raspberry_client contains Python script required for the locking mechanism. 

## Note
This module contains submodules from other repository. Therefore, if the dependent packages are missing, do the following: 
```
git submodule update --init --recursive
```
if it's the first time you checkout this repository. Otherwise, to update the submodules in the ROS/main/src/socket_webserver, run 
```
git submodule update --recursive --remote
```
