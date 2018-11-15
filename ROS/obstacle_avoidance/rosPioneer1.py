#!/usr/bin/env python
# author: gauthampdas (pdasgautham-at-yahoo-dot-com)
# isrc, university of ulster, derry, uk

#import roslib; roslib.load_manifest('pioneerControl')
import rospy
import nav_msgs.msg
import p2os_driver.msg
import geometry_msgs.msg

def processOdometry(self, odoMsg):
  print "linear: x=%0.2f, y=%0.2f, z=%0.2f" %(odoMsg.pose.pose.position.x,odoMsg.pose.pose.position.y, odoMsg.pose.pose.position.z)
  print "angular(quaternion): x=%0.2f, y=%0.2f, z=%0.2f, w=%0.2f" %(odoMsg.pose.pose.orientation.x,odoMsg.pose.pose.orientation.y, odoMsg.pose.pose.orientation.z, odoMsg.pose.pose.orientation.w)

def processSonar(self, sonMsg, sonLock):
  print sonMsg.ranges[0] [0]

if __name__ == "__main__":
  ns = "pioneer"
  sonSub = rospy.Subscriber(ns+"/sonar", p2os_driver.msg.SonarArray, processSonar)
  odoSub = rospy.Subscriber(ns+"/pose", nav_msgs.msg.Odometry, processOdometry)

  ## publishers
  velPub = rospy.Publisher(ns+"/cmd_vel", geometry_msgs.msg.Twist)
  motPub = rospy.Publisher(ns+"/cmd_motor_state", p2os_driver.msg.MotorState)

  rate = rospy.Rate(1)
  count = 0
  vel = geometry_msgs.msg.Twist()
  vel.linear.x = 0.0
  vel.angular.z = 0.0
  while not rospy.is_shutdown():
    velPub.publish(vel)
    rate.sleep()
    if count >20:
      vel.linear.x = 0.0
      vel.angular.z = 0.0
      velPub.publish(vel)
      break
    count += 1
