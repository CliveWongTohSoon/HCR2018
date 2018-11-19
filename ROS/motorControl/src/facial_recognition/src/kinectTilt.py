import freenect
import cv2 
import numpy as np

def get_video(video):
	video = cv2.cvtColor(video,cv2.COLOR_RGB2BGR)
	return video

def get_depth(depth):
	np.clip(depth, 0, 2**10 - 1, depth)
	depth >>= 2
	depth = depth.astype(np.uint8)
	return depth

face_cascade = cv2.CascadeClassifier("/home/opencv/data/haarcascades/haarcascade_frontalface_default.xml")
while True:
	vid = get_video(freenect.sync_get_video()[0])
	gray = cv2.cvtColor(vid, cv2.COLOR_BGR2GRAY)
	
	# do image processing here
	faces = face_cascade.detectMultiScale(gray, 1.3, 5)
	for (x,y,w,h) in faces:
		cv2.rectangle(vid,(x,y),(x+w,y+h),(255,0,0),2)
	cv2.imshow('Video',vid)
	if cv2.waitKey(1) & 0xFF == ord('q'):
		break
		
cv2.destroyAllWindows()
