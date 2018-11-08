#include <ros/ros.h>
// Necessary include files for message types
#include <p2os_msgs/BatteryState.h>
#include <p2os_msgs/MotorState.h>
#include "../../shared_files/robotInfo.h"


//This file deals with receiving things from the robot 
//and publishing them to the webserver
class publishMsgFromRobot 
{
    public:
        publishMsgFromRobot(ros::NodeHandle &nh);
        void batteryCallback(const p2os_msgs::BatteryState::ConstPtr& battery_msg);
        void motor_stateCallback(const p2os_msgs::MotorState::ConstPtr& motor_msg);
        void publishToServer();
    private:   
        // Publish for webserver to receive 
        ros::Publisher web_pub;
        // Subscriber for various robot functions
        ros::Subscriber battery_sub_;
        ros::Subscriber motor_status_sub_ ;
        // struct with robotInfo details
        robotInfo robot_Info;
};


// Default constructor for our teleoperator class
publishMsgFromRobot::publishMsgFromRobot(ros::NodeHandle &nh) 
{
    // Publish to web
    //web_pub = nh.advertise<robotInfo>("webserver", 10);
    // get battery status
    battery_sub_ = nh.subscribe<p2os_msgs::BatteryState>("/battery_state", 100, &publishMsgFromRobot::batteryCallback, this);
    // get motorStatus
    motor_status_sub_ = nh.subscribe<p2os_msgs::MotorState>("/motor_state", 100, &publishMsgFromRobot::motor_stateCallback, this);
}

void publishMsgFromRobot::batteryCallback(const p2os_msgs::BatteryState::ConstPtr& battery_msg)
{
    // print out battery msg for now
   //ROS_INFO("Charge voltage [%f]", battery_msg->voltage);
    //web_pub.publish(*battery_msg);
    robot_Info.voltage = battery_msg-> voltage;
}
void publishMsgFromRobot::motor_stateCallback(const p2os_msgs::MotorState::ConstPtr& motor_msg)
{
   //ROS_INFO("Motor state [%d]", motor_msg->state);
   robot_Info.motor_state = motor_msg-> state;
}

// Publish to server based on per second callback
void publishMsgFromRobot::publishToServer()
{
   // web_pub.publish(robot_Info);
}


int main(int argc, char** argv)
{
    ROS_INFO("Starting publishMsgFromRobot");
    // Initialise our ROS node
    ros::init(argc, argv, "publishMsgFromRobot");
    // Public node handle for global namespaces
    ros::NodeHandle nh;

    // Default constructed
    publishMsgFromRobot publishMsgFromRobot(nh);
    // timer to callback publish to topic every second
    //ros::Timer timer1 = nh.createTimer(ros::Duration(1), &publishMsgFromRobot::publishToServer);
    // Spin and leave work for callbacks
    ros::spin();
}
