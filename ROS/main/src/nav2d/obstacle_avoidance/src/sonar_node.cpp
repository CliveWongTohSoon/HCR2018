#include <ros/ros.h>
#include <sensor_msgs/Joy.h>
#include "geometry_msgs/Twist.h"
#include "geometry_msgs/Pose2D.h"
#include "p2os_msgs/SonarArray.h"
//#include "hcr_vip/sonar_vip.h"
//#include "rosaria_client/sonar_vip.h"
#include <signal.h>
#include <termios.h>
//#include "p2os.h"
#include "sensor_msgs/PointCloud.h"
#include "math.h"
#include "string.h"
#include <sstream>     // for ostringstream
#include <string>
#include <iostream>
#include "std_msgs/String.h"
#include <algorithm>
#include <geometry_msgs/Twist.h>
#include <geometry_msgs/Pose2D.h>
#define PI 3.14159265
//using geometry_msgs::Twist;
//using geometry_msgs::Pose2D;
using namespace std;
int begin = 1;
geometry_msgs::Pose2D msg;

void sonarCallback(const p2os_msgs::SonarArray::ConstPtr& SonarArray)
{ 
ros::NodeHandle nh;
ros::Publisher movement = nh.advertise<geometry_msgs::Pose2D>("movement", 1000);

float _so0_range =SonarArray->ranges[0] ;
float _so1_range =SonarArray->ranges[1] ;
float _so2_range =SonarArray->ranges[2] ;
float _so3_range =SonarArray->ranges[3] ;
float _so4_range =SonarArray->ranges[4] ;
float _so5_range =SonarArray->ranges[5] ;
float _so6_range =SonarArray->ranges[6] ;
float _so7_range =SonarArray->ranges[7] ;
float val =  max (max (_so2_range, _so3_range), max(_so4_range, _so5_range));
float heading_min =  min (min (min (_so0_range, _so1_range), min(_so2_range, _so3_range)), min(_so4_range, _so5_range));
     
	if (_so3_range < 2 && _so4_range < 2) {
		ROS_INFO ("forwards [%f] [%f]", _so3_range, _so4_range); // move forwards 20cm
		msg.x =0.2;
		msg.y=0;
		msg.theta=0;
		movement.publish(msg);
		
	}
	else if (heading_min < 2){
		float sonar_min = SonarArray->ranges[0];
		int ind = 0;
		for (int i=1 ; i<=7 ;i++ ) {
			if (SonarArray->ranges[i] <sonar_min ) {
				sonar_min = SonarArray->ranges[i];
				ind = i;
			}
		}
		float angle = 77.5-ind*25;
		ROS_INFO ("turn angle: [%f]", angle);  // angle = 77.5-i*25
		msg.x =0;
		msg.theta=angle;
		movement.publish(msg);
	}
		else {
			ROS_INFO ("backwards"); // move backwards 20cm
			msg.x =0.2;
			msg.theta=180;
			movement.publish(msg);
		}
		  
	}

int main(int argc, char** argv)
{
  ros::init(argc, argv, "sonar");
  ros::NodeHandle n;
  ros::Rate loop_rate(0.5);
  while (ros::ok()){
  ros::Subscriber sub = n.subscribe("/sonar", 100, sonarCallback);
  ros::Publisher movement = n.advertise<geometry_msgs::Pose2D>("movement", 1000);
  movement.publish(msg);
  ros::spin();
  loop_rate.sleep();
  }
}
