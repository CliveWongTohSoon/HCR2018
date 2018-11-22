#include <ros/ros.h>
#include <geometry_msgs/Twist.h>
#include <geometry_msgs/Pose2D.h>
#include <nav_msgs/Odometry.h>
#include <tf/tf.h>
#include <math.h>
#include <termios.h>

geometry_msgs::Twist cmd_vel;

geometry_msgs::Pose2D current_pose;
geometry_msgs::Pose2D initial_pose;
float distance = 0;

float old_current_angle = 0;
float current_angle = 0;
float initial_angle = 0;
float final_angle = 0;
float angle = 0;

int getch(){
  static struct termios oldt, newt;
  tcgetattr( STDIN_FILENO, &oldt);           // save old settings
  newt = oldt;
  newt.c_lflag &= ~(ICANON);                 // disable buffering      
  tcsetattr( STDIN_FILENO, TCSANOW, &newt);  // apply new settings

  int c = getchar();  // read character (non-blocking)

  tcsetattr( STDIN_FILENO, TCSANOW, &oldt);  // restore old settings
  return c;
}


void moveForward(){
    cmd_vel.linear.y = 0;
    cmd_vel.angular.x = 0;
    cmd_vel.angular.y = 0;
    cmd_vel.angular.z = 0;

    float traveled = sqrt(pow(current_pose.x - initial_pose.x, 2) + pow(current_pose.y - initial_pose.y, 2));
    if(traveled < distance*0.9){
        cmd_vel.linear.x = 1.5;
    }
    else if(traveled < distance){
        cmd_vel.linear.x = 1;
    }
    else{
        cmd_vel.linear.x = 0;
        distance = 0;
    }

    // if(current_pose.x < initial_pose.x + distance){
    //     cmd_vel.linear.x = 2;
    // }
    // else{
    //     cmd_vel.linear.x = 0;
    //     distance = 0;
    // }
}


void moveBackward(){
    cmd_vel.linear.y = 0;
    cmd_vel.angular.x = 0;
    cmd_vel.angular.y = 0;
    cmd_vel.angular.z = 0;

    //if(sqrt(pow(current_pose.x - initial_pose.x, 2) + pow(current_pose.y - initial_pose.y, 2)) < distance){
    float traveled = -sqrt(pow(current_pose.x - initial_pose.x, 2) + pow(current_pose.y - initial_pose.y, 2));
    if(traveled > distance*0.9){
        cmd_vel.linear.x = -1.5;
    }
    else if(traveled > distance){
        cmd_vel.linear.x = -1;
    }
    else{
        cmd_vel.linear.x = 0;
        distance = 0;
    }

    // if(current_pose.x > initial_pose.x + distance){
    //     cmd_vel.linear.x = -2;
    // }
    // else{
    //     cmd_vel.linear.x = 0;
    //     distance = 0;
    // }
}


/*
    angle:orientation.z
    0=0
    90=0.5
    180=1,-1
    270=-0.5
    360 = 0
*/

void turnLeft(){
    cmd_vel.linear.x = 0;
    cmd_vel.linear.y = 0;
    cmd_vel.angular.x = 0;
    cmd_vel.angular.y = 0;

    
    if(old_current_angle - current_angle > 180){
        final_angle -= 360;
    }
    old_current_angle = current_angle;
    
    if(angle < 135){
        if(current_angle < final_angle*1.25){
            cmd_vel.angular.z = 1.5;
        }
        else{
            cmd_vel.angular.z = 0;
            angle = 0;
        }
    }
    else{
        if(current_angle < final_angle*0.95){
        cmd_vel.angular.z = 1.5;
        }
        else if(current_angle < final_angle){
            cmd_vel.angular.z = 1.4;
        }
        else{
            cmd_vel.angular.z = 0;
            angle = 0;
        }
    }

}


void turnRight(){
    cmd_vel.linear.x = 0;
    cmd_vel.linear.y = 0;
    cmd_vel.angular.x = 0;
    cmd_vel.angular.y = 0;

    if(old_current_angle - current_angle < -180){
        final_angle += 360;
    }
    old_current_angle = current_angle;
    
    if(angle > -135){
        if(current_angle > final_angle*1.25){
            cmd_vel.angular.z = -1.2;
        }
        else{
            cmd_vel.angular.z = 0;
            angle = 0;
        }
    }
    else{
        if(current_angle > final_angle*0.95){
        cmd_vel.angular.z = -1.2;
        }
        else if(current_angle > final_angle){
            cmd_vel.angular.z = -1.4;
        }
        else{
            cmd_vel.angular.z = 0;
            angle = 0;
        }
    }

}


void stop(){
    cmd_vel.linear.x = 0;
    cmd_vel.linear.y = 0;
    cmd_vel.angular.x = 0;
    cmd_vel.angular.y = 0;
    cmd_vel.angular.z = 0;
    distance = 0;
    angle = 0;
}




float getDegrees(float angular){
    if(angular >= 0 && angular <= 1){
        return angular * 180;
    }
    else if(angular < 0 && angular >= -1)
        return 360 + (angular * 180);
} 


void poseCallback(const nav_msgs::Odometry::ConstPtr& msg){
    ROS_INFO("Seq: [%d]", msg->header.seq);
 
    current_pose.x = msg->pose.pose.position.x;
    current_pose.y = msg->pose.pose.position.y;
    current_angle = getDegrees(msg->pose.pose.orientation.z);


    ROS_INFO("Position-> x: [%f], y: [%f], z: [%f]", msg->pose.pose.position.x,msg->pose.pose.position.y, msg->pose.pose.position.z);
    ROS_INFO("Orientation-> x: [%f], y: [%f], z: [%f], w: [%f]", msg->pose.pose.orientation.x, msg->pose.pose.orientation.y, getDegrees(msg->pose.pose.orientation.z), msg->pose.pose.orientation.w);
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


//set global parameters to subscribed motorControl oder
void controlCallback(){
    distance = 1.5;
    angle = 330;

    initial_pose = current_pose;
    initial_angle = current_angle;

    final_angle = initial_angle + angle;
}


void update_cmd_vel(){
    if(distance == 0 && angle == 0){
        stop();
    }
    else{
        if(angle > 0){
            turnLeft();
        }
        else if(angle < 0){
            turnRight();
        }
        else{
            if(distance > 0){
                moveForward();
            }
            else if(distance < 0){
                moveBackward();
            }
        }
    }
    
}




int main(int argc, char *argv[]){
    ROS_INFO("start");
    ros::init(argc, argv, "subscriber");
    ros::NodeHandle n;


    //ros::Subscriber sub_nav = n.subscribe("motorControl", 100, controlCallback);
    ros::Subscriber sub_pose = n.subscribe("pose", 1000, poseCallback);
    ros::Publisher pub_cmd_vel = n.advertise<geometry_msgs::Twist>("cmd_vel", 1000);

    controlCallback();

    ros::Rate loop_rate(100);
    // while(ros::ok()){

    //     update_cmd_vel();
    //     pub_cmd_vel.publish(cmd_vel);
        
    //     ros::spinOnce();
    //     loop_rate.sleep();
    // }



    while (ros::ok())
    {
        int c = getch();   // call your non-blocking input function
        if (c == 'w'){
            ROS_INFO("w");
            distance = 0.1;
            angle = 0;

            initial_pose = current_pose;
            initial_angle = current_angle;

            final_angle = initial_angle + angle;
        }
        else if (c == 's'){
             ROS_INFO("s");
            distance = -0.1;
            angle = 0;

            initial_pose = current_pose;
            initial_angle = current_angle;

            final_angle = initial_angle + angle;
        }
        else if (c == 'a'){
            ROS_INFO("a");
            distance = 0;
            angle = 20;

            initial_pose = current_pose;
            initial_angle = current_angle;

            final_angle = initial_angle + angle;
        }
        else if (c == 'd'){
            ROS_INFO("d");
            distance = 0;
            angle = -20;

            initial_pose = current_pose;
            initial_angle = current_angle;

            final_angle = initial_angle + angle;
        }
        else if (c == 'f'){
            distance = 0;
            angle = 0;

            initial_pose = current_pose;
            initial_angle = current_angle;

            final_angle = initial_angle + angle;
        }
        update_cmd_vel();
        pub_cmd_vel.publish(cmd_vel);

        ros::spinOnce();
        loop_rate.sleep();
    }


    ros::spin();
    return 0;
}
