#!/usr/bin/env python
# license removed for brevity
import rospy
import freenect
import cv2 
import numpy as np
import dlib
from std_msgs.msg import String
from socket_msg.msg import socketMsg
import os

# current working directory
cwd = os.getcwd()
print(cwd, type(cwd))

def talker(position):
    pub = rospy.Publisher('chatter', String, queue_size=10)
    rospy.init_node('talker', anonymous=True)
    rate = rospy.Rate(10) # 10hz
    if not rospy.is_shutdown():
    	if position == 1:
    		hello_str = "LEFT %s" #% rospy.get_time()
    	if position == 2:
    		hello_str = "RIGHT %s" #% rospy.get_time()
    	if position == 3:
    		hello_str = "MIDDLE %s" #% rospy.get_time()
    	rospy.loginfo(hello_str)
    	pub.publish(hello_str)
    	rate.sleep()

def pub_to_websocket(x, y):
	pub = rospy.Publisher('webserver', socketMsg)
	rospy.init_node('kinect_face', anonymous=True)
	rate = rospy.Rate(10)
	msg = socketMsg()
	msg.type = 'facial_recognition'
	msg.eye_pos_x = x
	msg.eye_pos_y = y
	rospy.loginfo(msg)
	pub.publish(msg)
	rate.sleep()

def get_video(video):
	video = cv2.cvtColor(video, cv2.COLOR_RGB2BGR)
	return video

face_cascade = cv2.CascadeClassifier("/home/human/opencv/data/haarcascades/haarcascade_frontalface_default.xml")

tracker = dlib.correlation_tracker()
trackingFace = 0

rectangleColor = (0,165,255)

cap = cv2.VideoCapture(0)

while True:
	pos_x = 0
	pos_y = 0
	#Retrieve the latest image from the Kinect

	#Get from freenet
	#ret, frame = cap.read()

	#baseImage = frame
	baseImage = get_video(freenect.sync_get_video()[0])
	
	#Result image is the image we will show the user, which is a
	#combination of the original image from the webcam and the
	#overlayed rectangle for the largest face
	resultImage = baseImage.copy()

	if not trackingFace:	
		
		# need to make use of a gray colored image for face detection
		gray = cv2.cvtColor(baseImage, cv2.COLOR_BGR2GRAY)
	
		# use cascade detector to detect face
		faces = face_cascade.detectMultiScale(gray, 1.3, 5)
		#print("Using the cascade detector to detect face")
	
		# only interested in 'largest' face
		maxArea = 0
		x = 0
		y = 0
		w = 0
		h = 0

		# loop over all faces and check if the area of this face
		# is the largest so far
		# convert to int because of the requirement of the dlib tracker
		for (_x,_y,_w,_h) in faces:
			if  _w*_h > maxArea:
				x = int(_x)
				y = int(_y)
				w = int(_w)
				h = int(_h)
				maxArea = w*h
			if maxArea > 0:
				# initialise tracker
				tracker.start_track(baseImage,dlib.rectangle(x-10,y-10,x+w+10,y+h+20))
				# set the indicator variable such that we know the
				# tracker is tracking a region in the image
				trackingFace = 1
				
	if trackingFace:
		
		# update the tracker and request info 
		# about the quality of the tracking update
		trackingQuality = tracker.update(baseImage)
		
		# if tracking quality is good enough, determine the
		# updated position of the tracked region and draw the rectangle
		if trackingQuality >= 8.75:
			tracked_position = tracker.get_position()
			t_x = int(tracked_position.left())
			t_y = int(tracked_position.top())
			t_w = int(tracked_position.width())
			t_h = int(tracked_position.height())
			cv2.rectangle(resultImage, (t_x, t_y),
									(t_x + t_w , t_y + t_h),
									rectangleColor ,2)
			pos_x = t_x
			pos_y = t_y
		else:
			# if quality is not sufficient, stop tracking the face
			# in the next loop find the largest face in the image again
			trackingFace = 0
	
	font = cv2.FONT_HERSHEY_SIMPLEX
	cv2.putText(resultImage, "Face x coordinate = ", (10,400), font, 1,(255,255,255),2,cv2.LINE_AA)	
	cv2.putText(resultImage, str(pos_x), (350,400), font, 1,(255,255,255),2,cv2.LINE_AA)
	cv2.putText(resultImage, "Face y coordinate = ", (10,450), font, 1,(255,255,255),2,cv2.LINE_AA)	
	cv2.putText(resultImage, str(pos_y), (350,450), font, 1,(255,255,255),2,cv2.LINE_AA)
	
	pub_to_websocket(pos_x, pos_y)

	# if pos_x > 350 and pos_x != 0:
	# 	talker(1)
	# 	rospy.is_shutdown()
	# 	cv2.putText(resultImage, "LEFT", (450,400), font, 1,(255,255,255),2,cv2.LINE_AA)
	# elif pos_x < 150 and pos_x != 0:
	# 	talker(2)
	# 	rospy.is_shutdown()
	# 	cv2.putText(resultImage, "RIGHT", (450,400), font, 1,(255,255,255),2,cv2.LINE_AA)
	# elif pos_x > 150 and pos_x < 350 and pos_x != 0:	
	# 	talker(3)
	# 	rospy.is_shutdown
	# 	cv2.putText(resultImage, "MIDDLE", (450,400), font, 1,(255,255,255),2,cv2.LINE_AA)
	# elif pos_x == 0 and pos_y == 0:
	# 	talker(3)
	# 	rospy.is_shutdown()
	# 	cv2.putText(resultImage, "MIDDLE", (450,400), font, 1,(255,255,255),2,cv2.LINE_AA)
		
		
	#cv2.imshow("base-image", baseImage)
	cv2.imshow("result-image", resultImage)
	if cv2.waitKey(1) & 0xFF == ord('q'):
		break
		
cv2.destroyAllWindows()
