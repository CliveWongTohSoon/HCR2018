// this file will read utility messages from the robot and publish them for another node to receive
#include <ros/ros.h>
// Necessary include files for message types
#include <geometry_msgs/Twist.h>
#include <p2os_msgs/BatteryState.h>

//This package deals with receiving things from the robot 
//and publishing them to the webserver
class publishMsgFromRobot 
{
    public:
        // Constructor that takes the public nodehandle to subscribe to and advertise topics
        // As well as other properties related to joystick management
        publishMsgFromRobot(ros::NodeHandle &nh);
        // Callback function for our joystick commands
        void batteryCallback(const p2os_msgs::BatteryState::ConstPtr& battery_msg);
        
    private:   

        // Publish for webserver to receive 
        ros::Publisher web_pub;
        // Battery subscriber
        ros::Subscriber battery_sub_;
};


// Default constructor for our teleoperator class
publishMsgFromRobot::publishMsgFromRobot(ros::NodeHandle &nh) 
{
    // Publish to web
    web_pub = nh.advertise<p2os_msgs::BatteryState>("webserver", 10);
    // Subscriber 3rd and 4th arguments are the callback member function and instance pointed to for the callback
    battery_sub_ = nh.subscribe<p2os_msgs::BatteryState>("/battery_state", 100, &publishMsgFromRobot::batteryCallback, this);
}

void publishMsgFromRobot::batteryCallback(const p2os_msgs::BatteryState::ConstPtr& battery_msg)
{
    // print out battery msg for now
   // ROS_INFO("Charge voltage [%f]", battery_msg->voltage);
    web_pub.publish(*battery_msg);
    // send to web server
    // vel_pub_.publish(twist_msg);
}


int main(int argc, char** argv)
{
    // Initialise our ROS node
    ros::init(argc, argv, "publishMsgFromRobot");
    // Public node handle for global namespaces
    ros::NodeHandle nh;

    // Default constructed
    publishMsgFromRobot publishMsgFromRobot(nh);

    // Spin and leave work for callbacks
    ros::spin();
}
