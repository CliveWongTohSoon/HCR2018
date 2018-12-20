# HCR2018
This repository is part of Imperial College Human Centered Robotics. It consists of frontend, server and ROS running on the robots.

## Important
This module contains submodules from other repository. Therefore, you need to do

```
git submodule update --init --recursive
```

if it's the first time you checkout this repository. 

Otherwise, to update the submodules in the webserver_socket (if there is any), run 
```
git submodule update --recursive --remote
```

## To connect to AWS
* Connect to server EC2 instance
```
ssh -i node.pem ubuntu@ec2-35-176-128-102.eu-west-2.compute.amazonaws.com
```

* Connect to client EC2 instance
```
ssh -i client.pem ubuntu@ec2-52-56-71-140.eu-west-2.compute.amazonaws.com

```

##Autocad folder
contain all the autocad design for storage (used in laser cutting)

##Arduino
contain code use in arduino to control motor

##Raspberry pi
contain client code use in raspberry pi 

##motor_datasheet
contain datasheet for stepper motor and 3V DC motor

##kinect_nav-master
obstacle avoidance code using kinect

##obstacle_avoidance
obstacle avoidance code using sonar
