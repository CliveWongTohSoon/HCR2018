#include <ros/ros.h>
#include <geometry_msgs/Twist.h>
#include <geometry_msgs/Pose2D.h>
#include <nav_msgs/Odometry.h>

geometry_msgs::Pose2D current_pose;
ros::Publisher pub_pose2d;

void poseCallback(const nav_msgs::Odometry::ConstPtr& msg){
    ROS_INFO("Seq: [%d]", msg->header.seq);
    // linear position
    current_pose.x = msg->pose.pose.position.x;
    current_pose.y = msg->pose.pose.position.y;
    ROS_INFO("Position-> x: [%f], y: [%f], z: [%f]", msg->pose.pose.position.x,msg->pose.pose.position.y, msg->pose.pose.position.z);
    ROS_INFO("Orientation-> x: [%f], y: [%f], z: [%f], w: [%f]", msg->pose.pose.orientation.x, msg->pose.pose.orientation.y, msg->pose.pose.orientation.z, msg->pose.pose.orientation.w);
    ROS_INFO("Vel-> Linear: [%f], Angular: [%f]", msg->twist.twist.linear.x,msg->twist.twist.angular.z);
}

/*
void get_cmd_vel(const geometry_msgs::Twist &twist){
    ROS_INFO("received_linear x = %d \n", twist.linear.x);
    ROS_INFO("received_angular z = %d \n", twist.angular.z);
}*/

int main(int argc, char *argv[]){
    ROS_INFO("start");
    ros::init(argc, argv, "subscriber");
    ros::NodeHandle n;

    ros::Subscriber sub_pose = n.subscribe("pose", 1000, poseCallback);
    //ros::Subscriber sub_cmd_vel = n.subscribe("/cmd_vel", 100, &get_cmd_vel);
    
    ros::spin();
    return 0;
}
