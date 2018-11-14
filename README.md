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
