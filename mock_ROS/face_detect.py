#!/usr/bin/env python
# license removed for brevity

import cv2
import numpy as np
import dlib
import os
from socketIO_client_nexus import SocketIO, LoggingNamespace
import base64

url = "http://ec2-35-176-128-102.eu-west-2.compute.amazonaws.com"
url_local = 'localhost'
socketIO = SocketIO(url_local, 9000, LoggingNamespace)

# current working directory
cwd = os.getcwd()
facial_count = 0

# TODO:- Make it into a class
def stream_video_to_socket(img):
	global facial_count
	if facial_count == 10:
		socketIO.emit('image', img)
		facial_count = 0
	else:
		facial_count += 1
	
def get_video(video):
	video = cv2.cvtColor(video, cv2.COLOR_RGB2BGR)
	return video

face_cascade = cv2.CascadeClassifier(cwd + "/opencv/data/haarcascades/haarcascade_frontalface_default.xml")

tracker = dlib.correlation_tracker()
trackingFace = 0

rectangleColor = (0, 165, 255)

cap = cv2.VideoCapture(0)

while True:
	pos_x = 0
	pos_y = 0
	#Retrieve the latest image from the Kinect

	#Get from freenet
	ret, frame = cap.read()

	ret_jpg, jpeg = cv2.imencode('.jpg', frame)

	baseImage = frame
	# baseImage = get_video(freenect.sync_get_video()[0])

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
		for (_x, _y, _w, _h) in faces:
			if _w*_h > maxArea:
				x = int(_x)
				y = int(_y)
				w = int(_w)
				h = int(_h)
				maxArea = w*h
			if maxArea > 0:
				# initialise tracker
				tracker.start_track(baseImage, dlib.rectangle(x-10, y-10, x+w+10, y+h+20))
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
                            (t_x + t_w, t_y + t_h),
                            rectangleColor, 2)
			pos_x = t_x
			pos_y = t_y
		else:
			# if quality is not sufficient, stop tracking the face
			# in the next loop find the largest face in the image again
			trackingFace = 0

	font = cv2.FONT_HERSHEY_SIMPLEX
	cv2.putText(resultImage, "Face x coordinate = ", (10, 400),
	            font, 1, (255, 255, 255), 2, cv2.LINE_AA)
	cv2.putText(resultImage, str(pos_x), (350, 400),
	            font, 1, (255, 255, 255), 2, cv2.LINE_AA)
	cv2.putText(resultImage, "Face y coordinate = ", (10, 450),
	            font, 1, (255, 255, 255), 2, cv2.LINE_AA)
	cv2.putText(resultImage, str(pos_y), (350, 450),
	            font, 1, (255, 255, 255), 2, cv2.LINE_AA)

	encoded_jpeg = base64.b64encode(jpeg).decode('utf-8')
	stream_video_to_socket(encoded_jpeg)

	cv2.imshow("result-image", resultImage)
	if cv2.waitKey(1) & 0xFF == ord('q'):
		break

cv2.destroyAllWindows()
