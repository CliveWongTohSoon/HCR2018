#include <ros/ros.h>
#include "std_msgs/String.h"

void actionCallBack(const std_msgs::String::ConstPtr& msg) {

ROS_INFO(msg->data.c_str());

}

int main(int argc, char *argv[])
{
    
    // Initialise our ROS node
    ros::init(argc, argv, "hello");
    // Create a handle to start and shutdown your node
    ros::NodeHandle nh;
    ros::Subscriber sub = nh.subscribe("action",10, &actionCallBack);
    ros::Rate loop_rate(1);
    while(ros::ok()) {
    
    // Printing function
    //ROS_INFO("Hello ROS!");

    ros::Subscriber sub = nh.subscribe("action",1, &actionCallBack);
    // Loops and checks for callbacks continuously, awaits stop signal (e.g. Ctrl-C) to exit
    
    ros::spinOnce();
    loop_rate.sleep();
	}

    return 0;
}
