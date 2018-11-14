#include <ros/ros.h>
// Necessary include files for message types
#include <p2os_msgs/BatteryState.h>
#include <p2os_msgs/MotorState.h>
#include <custom_msgs/robotInfo.h>
#include <geometry_msgs/Twist.h>
#include <geometry_msgs/Pose2D.h>
#include <geometry_msgs/Vector3.h>
#include <nav_msgs/Odometry.h>
//This file deals with receiving things from the robot 
//and publishing them to the webserver

  class publishMsgFromRobot {
    public:
        publishMsgFromRobot(ros::NodeHandle & nh);
    void batteryCallback(const p2os_msgs::BatteryState::ConstPtr & battery_msg);
    void motor_stateCallback(const p2os_msgs::MotorState::ConstPtr & motor_msg);
    void odometry_Callback(const nav_msgs::Odometry::ConstPtr &msg);
    void publishToServer();
    private:
        // Publish for webserver to receive 
    ros::Publisher web_pub;
    // Subscriber for various robot functions
    ros::Subscriber battery_sub_;
    ros::Subscriber motor_status_sub_;
    ros::Subscriber odometry_sub_;
    // custom msg
    custom_msgs::robotInfo robot_Info;

  };

// Default constructor for our teleoperator class
publishMsgFromRobot::publishMsgFromRobot(ros::NodeHandle & nh) {
  // Publish to web
  web_pub = nh.advertise < custom_msgs::robotInfo > ("webserver", 10);
  // get battery status
  battery_sub_ = nh.subscribe < p2os_msgs::BatteryState > ("/battery_state", 1000, & publishMsgFromRobot::batteryCallback, this);
  // get motorStatus
  motor_status_sub_ = nh.subscribe < p2os_msgs::MotorState > ("/motor_state", 1000, & publishMsgFromRobot::motor_stateCallback, this);
  odometry_sub_ = nh.subscribe("/pose", 1000, & publishMsgFromRobot::odometry_Callback, this);

}
void publishMsgFromRobot::batteryCallback(const p2os_msgs::BatteryState::ConstPtr & battery_msg) {
  // print out battery msg for now
  robot_Info.voltage = battery_msg -> voltage;
  //ROS_INFO("Charge voltage using robot_Info [%f]", robot_Info.voltage);
}
void publishMsgFromRobot::motor_stateCallback(const p2os_msgs::MotorState::ConstPtr & motor_msg) {
  robot_Info.motor_state = motor_msg -> state;
  //ROS_INFO("Motor state using robot_Info[%d]", robot_Info.motor_state);
  // For now publish in motor
  publishToServer();

}
void publishMsgFromRobot::odometry_Callback(const nav_msgs::Odometry::ConstPtr & msg) {
    // Set values for parameters to send
    robot_Info.linear_x = msg->twist.twist.linear.x ;
    robot_Info.linear_y = msg->twist.twist.linear.y ;
    robot_Info.linear_z = msg->twist.twist.linear.z;
    robot_Info.angular_x = msg->twist.twist.angular.x ;
    robot_Info.angular_y = msg->twist.twist.angular.y ;
    robot_Info.angular_z = msg->twist.twist.angular.z ;
  //ROS_INFO("Linear velocity using [%f]", msg->twist.twist.linear.x);
}
void publishMsgFromRobot::publishToServer() {

  web_pub.publish(robot_Info);
}

// // Temp callback for testing
// void tempCallback(const custom_msgs::robotInfo robot_Info){
//     ROS_INFO("Motor state using webserver", robot_Info.motor_state);
//   //ROS_INFO("Motor state using callback", robot_Info.motor_state);
// }

int main(int argc, char ** argv) {
  ROS_INFO("Starting publishMsgFromRobot");
  // Initialise our ROS node
  ros::init(argc, argv, "publishMsgFromRobot");
  // Public node handle for global namespaces
  ros::NodeHandle nh;

  // Default constructed
  publishMsgFromRobot publishMsgFromRobot(nh);
  // // temp callback
  // ros::Subscriber temp= nh.subscribe("/webserver", 1000, &tempCallback);
  // Spin and leave work for callbacks
  ros::spin();
}