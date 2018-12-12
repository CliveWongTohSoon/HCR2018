/*************************************************************************
 * 
 * This file acts as an interface between webserver topic and different
 * topics in the robot
 * 
 * ***********************************************************************/

#include <ros/ros.h>
#include <p2os_msgs/BatteryState.h>
#include <p2os_msgs/MotorState.h>
#include <socket_msg/socketMsg.h>
#include <geometry_msgs/Twist.h>
#include <geometry_msgs/Pose2D.h>
#include <geometry_msgs/Vector3.h>
#include <nav_msgs/Odometry.h>
#include <nav2d_navigator/RobotNavigator.h>
#include <actionlib/client/simple_action_client.h>

class publishMsgFromRobot {
	public:
    	publishMsgFromRobot(ros::NodeHandle & nh);
		void batteryCallback(const p2os_msgs::BatteryState::ConstPtr & battery_msg);
		void motor_stateCallback(const p2os_msgs::MotorState::ConstPtr & motor_msg);
		void odometry_Callback(const nav_msgs::Odometry::ConstPtr &msg);
		void reach_goal_Callback(const nav2d_navigator::MoveToPosition2DActionResult::ConstPtr &msg);
		void start_goal_Callback(const nav2d_navigator::MoveToPosition2DActionGoal::ConstPtr &goal);
		void to_origin_callback(const socket_msg::socketMsg::ConstPtr &msg);
		void publishToServer();

  	private:
		// Publish for webserver to receive 
		ros::Publisher web_pub;
		// Subscriber for various robot functions
		ros::Subscriber battery_sub_;
		ros::Subscriber motor_status_sub_;
		ros::Subscriber odometry_sub_;
		ros::Subscriber reach_goal_sub_;
		ros::Subscriber start_goal_sub_;
		ros::Subscriber to_origin_sub;
		// custom msg
		socket_msg::socketMsg robot_Info;
		bool to_origin = false;
};

// Default constructor for our teleoperator class
publishMsgFromRobot::publishMsgFromRobot(ros::NodeHandle & nh) {
	// Publish to web
	web_pub = nh.advertise<socket_msg::socketMsg>("webserver", 10);
	// get battery status
	battery_sub_ = nh.subscribe<p2os_msgs::BatteryState>("/battery_state", 1000, & publishMsgFromRobot::batteryCallback, this);
	// get motorStatus
	motor_status_sub_ = nh.subscribe<p2os_msgs::MotorState>("/motor_state", 1000, & publishMsgFromRobot::motor_stateCallback, this);
	odometry_sub_ = nh.subscribe("/odom", 1000, & publishMsgFromRobot::odometry_Callback, this);
	reach_goal_sub_ = nh.subscribe("MoveTo/result", 1000, & publishMsgFromRobot::reach_goal_Callback, this);
	start_goal_sub_ = nh.subscribe("MoveTo/goal", 1000, & publishMsgFromRobot::start_goal_Callback, this);
	to_origin_sub = nh.subscribe("/to_origin", 1000, & publishMsgFromRobot::to_origin_callback, this);
}

void publishMsgFromRobot::batteryCallback(const p2os_msgs::BatteryState::ConstPtr & battery_msg) {
	// print out battery msg for now
	robot_Info.type = "battery_voltage";
	robot_Info.voltage = battery_msg -> voltage;
	//ROS_INFO("Charge voltage using robot_Info [%f]", robot_Info.voltage);
	publishToServer();
}

void publishMsgFromRobot::motor_stateCallback(const p2os_msgs::MotorState::ConstPtr & motor_msg) {
	robot_Info.type = "motor_state";
	robot_Info.motor_state = motor_msg -> state;
	//ROS_INFO("Motor state using robot_Info[%d]", robot_Info.motor_state);
	// For now publish in motor
	publishToServer();
}

void publishMsgFromRobot::odometry_Callback(const nav_msgs::Odometry::ConstPtr & msg) {
    robot_Info.type = "motor_velocities";
    // Set values for parameters to send
    robot_Info.linear_x = msg->twist.twist.linear.x ;
    robot_Info.linear_y = msg->twist.twist.linear.y ;
    robot_Info.linear_z = msg->twist.twist.linear.z;
    robot_Info.angular_x = msg->twist.twist.angular.x ;
    robot_Info.angular_y = msg->twist.twist.angular.y ;
    robot_Info.angular_z = msg->twist.twist.angular.z ;
	// ROS_INFO("Linear velocity using [%f]", msg->twist.twist.linear.x);
	publishToServer();
}

void publishMsgFromRobot::publishToServer() {
  	web_pub.publish(robot_Info);
}

void publishMsgFromRobot::to_origin_callback(const socket_msg::socketMsg::ConstPtr &msg) {
	to_origin = msg->to_origin;
}

void publishMsgFromRobot::reach_goal_Callback(const nav2d_navigator::MoveToPosition2DActionResult::ConstPtr &msg){
	robot_Info.type = "status";
	robot_Info.status = to_origin ? "arrived_origin" : "arrived_destination";
	robot_Info.pos_x = msg->result.final_pose.x;
	robot_Info.pos_y = msg->result.final_pose.y;
	robot_Info.distance = msg->result.final_distance;	
	
	ROS_INFO("Reached goal from rs_interface1");
	to_origin = false;
	publishToServer();
}
void publishMsgFromRobot::start_goal_Callback(const nav2d_navigator::MoveToPosition2DActionGoal::ConstPtr &goal){
	robot_Info.type = "status";
	robot_Info.status = to_origin ? "to_origin" : "to_dest";
	ROS_INFO("Moving to goal from rs_interface");
	robot_Info.pos_x = goal->goal.target_pose.x;
	robot_Info.pos_y = goal->goal.target_pose.y;
	robot_Info.distance = goal->goal. target_distance;	
	publishToServer();
}
// // Temp callback for testing
// void tempCallback(const custom_msgs::robotInfo robot_Info){
//     ROS_INFO("Motor state using webserver", robot_Info.motor_state);
//   //ROS_INFO("Motor state using callback", robot_Info.motor_state);
// }


int main(int argc, char ** argv) {

	ROS_INFO("Starting rs_interface");
	// Initialise our ROS node
	ros::init(argc, argv, "rs_interface");
	// Public node handle for global namespaces
	ros::NodeHandle nh;

	// Default constructed
	publishMsgFromRobot publishMsgFromRobot(nh);
	ros::spin() ;
}
