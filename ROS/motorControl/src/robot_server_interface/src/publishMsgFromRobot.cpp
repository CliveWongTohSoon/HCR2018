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
        // custom msg
        custom_msgs::robotInfo robot_Info;

};


// Default constructor for our teleoperator class
publishMsgFromRobot::publishMsgFromRobot(ros::NodeHandle &nh) 
{
     // Publish to web
    web_pub = nh.advertise<custom_msgs::robotInfo>("webserver", 10);
    // get battery status
    battery_sub_ = nh.subscribe<p2os_msgs::BatteryState>("/battery_state", 1000, &publishMsgFromRobot::batteryCallback, this);
    // get motorStatus
    motor_status_sub_ = nh.subscribe<p2os_msgs::MotorState>("/motor_state", 1000, &publishMsgFromRobot::motor_stateCallback, this);


}

void publishMsgFromRobot::batteryCallback(const p2os_msgs::BatteryState::ConstPtr& battery_msg)
{
    // print out battery msg for now
    robot_Info.voltage = battery_msg -> voltage;
   ROS_INFO("Charge voltage using robot_Info [%f]", robot_Info.voltage);
   
    //web_pub.publish(*battery_msg);
   //robot_Info.voltage = battery_msg-> voltage;
}
void publishMsgFromRobot::motor_stateCallback(const p2os_msgs::MotorState::ConstPtr& motor_msg)
{
   robot_Info.motor_state = motor_msg->state;
   ROS_INFO("Motor state using robot_Info[%d]", robot_Info.motor_state);
    // For now publish in motor
    publishToServer();

}
void publishMsgFromRobot::publishToServer()
{   

   web_pub.publish(robot_Info);
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

    // Spin and leave work for callbacks
    ros::spin();
}
