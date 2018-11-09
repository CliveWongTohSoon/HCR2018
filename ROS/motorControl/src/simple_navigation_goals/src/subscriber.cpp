#include <ros/ros.h>
#include <geometry_msgs/Twist.h>
#include <geometry_msgs/Pose2D.h>
#include <nav_msgs/Odometry.h>
#include <tf/tf.h>
#include <math.h>

geometry_msgs::Twist cmd_vel;

geometry_msgs::Pose2D current_pose;
geometry_msgs::Pose2D initial_pose;
float distance;

float current_angle;
float initial_angle;
float degree;

bool toggle = 0;

void poseCallback(const nav_msgs::Odometry::ConstPtr& msg){
    ROS_INFO("Seq: [%d]", msg->header.seq);
    // linear position
    current_pose.x = msg->pose.pose.position.x;
    current_pose.y = msg->pose.pose.position.y;
    ROS_INFO("Position-> x: [%f], y: [%f], z: [%f]", msg->pose.pose.position.x,msg->pose.pose.position.y, msg->pose.pose.position.z);
    ROS_INFO("Orientation-> x: [%f], y: [%f], z: [%f], w: [%f]", msg->pose.pose.orientation.x, msg->pose.pose.orientation.y, msg->pose.pose.orientation.z, msg->pose.pose.orientation.w);
    ROS_INFO("Vel-> Linear: [%f], Angular: [%f]", msg->twist.twist.linear.x,msg->twist.twist.angular.z);
    /*
    // quaternion to RPY conversion
    tf::Quaternion q(
    msg->pose.pose.orientation.x,
    msg->pose.pose.orientation.y,
    msg->pose.pose.orientation.z,
    msg->pose.pose.orientation.w);
    tf::Matrix3x3 m(q);
    double roll, pitch, yaw;
    m.getRPY(roll, pitch, yaw);
    // angular position
    current_pose.theta = yaw;*/
}

void moveForward(float distance){
    cmd_vel.linear.y = 0;
    cmd_vel.angular.x = 0;
    cmd_vel.angular.y = 0;
    cmd_vel.angular.z = 0;
    if(current_pose.x - initial_pose.x < distance){
        cmd_vel.linear.x = 2;
    }
    else{
        cmd_vel.linear.x = 0;
        toggle = !toggle;

        initial_pose = current_pose;
    }
}

void moveBackward(float distance){
    cmd_vel.linear.y = 0;
    cmd_vel.angular.x = 0;
    cmd_vel.angular.y = 0;
    cmd_vel.angular.z = 0;
    if(current_pose.x - initial_pose.x > -distance){
        cmd_vel.linear.x = -2;
    }
    else{
        cmd_vel.linear.x = 0;
        toggle = !toggle;
        initial_pose = current_pose;
    }
}


void moveDiagonal(float degree, float distance){

}

void turnLeft(float degree){
    cmd_vel.linear.x = 0;
    cmd_vel.linear.y = 0;
    cmd_vel.angular.x = 0;
    cmd_vel.angular.y = 0;
    // if(current_angle - initial_angle > degree){
    //     cmd_vel.linear.x = -0.25;
    // }
    // else{
    //     cmd_vel.linear.x = 0;
    // }
    cmd_vel.angular.z = 2;


    /*
    angle:orientation.z
    0=0
    90=0.5
    180=1,-1
    270=-0.5
    360 = 0
    */
}


void newOrder(){
    initial_pose = current_pose;
    distance = 2;
}


void update_cmd_vel(){

    // if forward
    //moveBackward(distance);
    // if (!toggle)
    //     moveForward(distance);
    // else{
    //     moveBackward(distance);
    // }
    
    turnLeft(1);
}




int main(int argc, char *argv[]){
    ROS_INFO("start");
    ros::init(argc, argv, "subscriber");
    ros::NodeHandle n;

    ros::Subscriber sub_pose = n.subscribe("pose", 1000, poseCallback);
    ros::Publisher pub_cmd_vel = n.advertise<geometry_msgs::Twist>("cmd_vel", 1000);

    newOrder();

    ros::Rate loop_rate(100);
    while(ros::ok()){

        update_cmd_vel();
        pub_cmd_vel.publish(cmd_vel);
        
        ros::spinOnce();
        loop_rate.sleep();
    }


    ros::spin();
    return 0;
}
