#include <ros/ros.h>
#include <nav_msgs/Odometry.h>

nav_msgs::Odometry odom;
ros::Time last_time;
void poseCallback(const nav_msgs::Odometry::ConstPtr& msg){
    //ROS_INFO("Seq: [%d]", msg->header.seq);
    ros::Time current_time = ros::Time::now();
    
    odom.header.stamp = current_time;
    odom.header.frame_id = "odom";

    //set the position
    odom.pose.pose.position.x = msg->pose.pose.position.x;
    odom.pose.pose.position.y = msg->pose.pose.position.y;
    odom.pose.pose.position.z = msg->pose.pose.position.z;
    odom.pose.pose.orientation.x = msg->pose.pose.orientation.x;
    odom.pose.pose.orientation.y = msg->pose.pose.orientation.y;
    odom.pose.pose.orientation.z = msg->pose.pose.orientation.z;
    odom.pose.pose.orientation.w = msg->pose.pose.orientation.w;

    //set the velocity
    odom.child_frame_id = "base_link";
    odom.twist.twist.linear.x = msg->twist.twist.linear.x;
    odom.twist.twist.linear.y = msg->twist.twist.linear.y;
    odom.twist.twist.angular.z = msg->twist.twist.angular.z;

    last_time = current_time;
    //ROS_INFO("Position-> x: [%f], y: [%f], z: [%f]", msg->pose.pose.position.x,msg->pose.pose.position.y, msg->pose.pose.position.z);
    //ROS_INFO("Orientation-> x: [%f], y: [%f], z: [%f], w: [%f]", msg->pose.pose.orientation.x, msg->pose.pose.orientation.y, getDegrees(msg->pose.pose.orientation.z), msg->pose.pose.orientation.w);
    //ROS_INFO("Vel-> Linear: [%f], Angular: [%f]", msg->twist.twist.linear.x,msg->twist.twist.angular.z);
}


int main(int argc, char** argv){
  ros::init(argc, argv, "odometry_publisher");
  ros::Time::init();
  
  ros::NodeHandle n;
  ros::Subscriber sub_pose = n.subscribe("pose", 100, poseCallback);
  ros::Publisher odom_pub = n.advertise<nav_msgs::Odometry>("odom", 50);

  ros::Rate loop_rate(1.0);
  while(n.ok()){
    ros::spinOnce();
    
    odom_pub.publish(odom);

    ros::spinOnce();
    loop_rate.sleep();
  }
}
