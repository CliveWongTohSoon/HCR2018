#include <ros/ros.h>
// Necessary include files for message types
#include <p2os_msgs/BatteryState.h>
#include <p2os_msgs/MotorState.h>
#include <custom_msgs/robotInfo.h>

//This file deals with receiving things from the robot 
//and publishing them to the webserver

/* TODO: check if I can receive stuff from robot
Check why not receiving callbacks from robot. 
Determined its not due to custom msgs, which work fine.
*/
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
        custom_msgs::robotInfo robot_Info;
};


// Default constructor for our teleoperator class
publishMsgFromRobot::publishMsgFromRobot(ros::NodeHandle &nh) 
{
    // Publish to web
    web_pub = nh.advertise<custom_msgs::robotInfo>("webserver", 10);
    // get battery status
    battery_sub_ = nh.subscribe<p2os_msgs::BatteryState>("/battery_state", 100, &publishMsgFromRobot::batteryCallback, this);
    // get motorStatus
    motor_status_sub_ = nh.subscribe<p2os_msgs::MotorState>("/motor_state", 100, &publishMsgFromRobot::motor_stateCallback, this);
    robot_Info.voltage = 5;
    robot_Info.motor_state = 0;
    ROS_INFO("Charge voltage [%f]", robot_Info.voltage);
}

void publishMsgFromRobot::batteryCallback(const p2os_msgs::BatteryState::ConstPtr& battery_msg)
{
    // print out battery msg for now
   ROS_INFO("Charge voltage [%f]", battery_msg->voltage);
    //web_pub.publish(*battery_msg);
   robot_Info.voltage = battery_msg-> voltage;
}
void publishMsgFromRobot::motor_stateCallback(const p2os_msgs::MotorState::ConstPtr& motor_msg)
{
   //ROS_INFO("Motor state [%d]", motor_msg->state);
   robot_Info.motor_state = motor_msg-> state;
    // For now publish in motor
    this->publishToServer();
}

// Publish to server based on per second callback
void publishMsgFromRobot::publishToServer()
{
   web_pub.publish(robot_Info);
}


int main(int argc, char** argv)
{
    ROS_INFO("Starting publishMsgFromRobot2");
    // Initialise our ROS node
    ros::init(argc, argv, "publishMsgFromRobot");
    // Public node handle for global namespaces
    ros::NodeHandle nh;

    // Default constructed
    publishMsgFromRobot publishMsgFromRobot(nh);

    // Spin and leave work for callbacks
    ros::spin();
}
