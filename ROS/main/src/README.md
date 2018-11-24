ROS Navigation Stack
====================

## HOW NAVIGATION STACK RUNS
* First it tries to create a link between frame_id map (which is linked to laser) and base_link
* Then it creates link between frame_id odom and base_link
* frame_id odom is only created after navigation is set, therefore the warning:
    * Waiting move_base to start
    * ..., tf error: canTransform: target_frame odom does not exist.. canTransform returned after 0.100653 timeout was 0.1

# Problem known
* Resolution of odom is not matched with the map
* The robot seems to not be able to locate itself locally
* The goal needs to me scaled properly as well. 


A 2D navigation stack that takes in information from odometry, sensor
streams, and a goal pose and outputs safe velocity commands that are sent
to a mobile base.

 * AMD64 Debian Job Status: [![Build Status](http://build.ros.org/buildStatus/icon?job=Mbin_uB64__navigation__ubuntu_bionic_amd64__binary)](http://build.ros.org/job/Mbin_uB64__navigation__ubuntu_bionic_amd64__binary/)

Related stacks:

 * http://github.com/ros-planning/navigation_msgs (new in Jade+)
 * http://github.com/ros-planning/navigation_tutorials
 * http://github.com/ros-planning/navigation_experimental

For discussion, please check out the
https://groups.google.com/group/ros-sig-navigation mailing list.
