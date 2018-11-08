#include <ros/ros.h>
#include <cv_bridge/cv_bridge.h>
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/core/core.hpp>
#include <opencv2/opencv.hpp>
#include <opencv2/tracking.hpp>
#include <opencv2/objdetect.hpp>
#include <opencv2/core/ocl.hpp>
#include <opencv2/imgcodecs.hpp>
#include <opencv2/imgproc.hpp>
#include <opencv2/videoio.hpp>
#include <opencv2/video.hpp>

#include <iostream>
#include <sstream>

using namespace std;
using namespace cv;

// Convert to string
#define SSTR( x ) static_cast< std::ostringstream & >( \
( std::ostringstream() << std::dec << x ) ).str()

class cam_test{
	public:
		cam_test(){
			
			VideoCapture cap(1); // open video camera no. 0
			if(!cap.isOpened()){ // if not, exit program
				cout << "Cannot open video cam" << endl;
			}
			
			Mat frame, frame_gray;
					
			CascadeClassifier face_cascade;
			string xmlFile = "/home/skeyang/opencv/data/haarcascades/haarcascade_frontalface_alt.xml";
			face_cascade.load(xmlFile);
			if(!face_cascade.load(xmlFile)){
				cout << "Error reading cascade file" << endl;
			}
			
			cap.read(frame); // read a new frame from video
				
			while(cap.read(frame)){

//////////////////////// can do image processing here  ///////////////////////////////////////////

				cvtColor(frame, frame_gray, COLOR_BGR2GRAY);
				equalizeHist(frame_gray, frame_gray);
			
				//Detect faces
    		vector<Rect> faces;
    		face_cascade.detectMultiScale(frame_gray, faces, 1.1, 2, 0|CV_HAAR_SCALE_IMAGE, Size(30, 30) );

    		// Draw circles on the detected faces
    		for( int i = 0; i < faces.size(); i++ ){
      		Point center(faces[i].x + faces[i].width*0.5, faces[i].y + faces[i].height*0.5);
        	ellipse(frame, center, Size( faces[i].width*0.5, faces[i].height*0.5), 0, 0, 360, Scalar( 255, 0, 255 ), 4, 8, 0 );
    		}
    		putText(frame, "opencv-hub", Point(1,1), FONT_HERSHEY_DUPLEX);   		
    
//////////////////////////////////////////////////////////////////////////////////////////////////				
				
				imshow("Detection", frame);
				
				if(waitKey(1) == 27){ // if 'esc' key is pressed, break loop
					break;
				}
			}
		}
		
		~cam_test(){
			cvDestroyWindow("Camera_Output"); 
		}
};

int main(int argc, char **argv){
	ros::init(argc, argv, "internal_cam_test");
	cam_test cam_object;
	ROS_INFO("Cam tested!");
}
