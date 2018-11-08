#include <ros/ros.h>
#include <cv_bridge/cv_bridge.h>
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/opencv.hpp>
#include <opencv2/tracking.hpp>
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
			
			VideoCapture cap(0); // open video camera no. 0
			if(!cap.isOpened()){ // if not, exit program
				cout << "Cannot open video cam" << endl;
			}
			
			Mat frame;
			HOGDescriptor hog;
			hog.setSVMDetector(HOGDescriptor::getDefaultPeopleDetector());
			
			cap.read(frame); // read a new frame from video

			// Define initial bounding box 
    	//Rect2d bbox(200, 40, 200, 230);
    	// Display bounding box. 
    	//rectangle(frame, bbox, Scalar( 255, 0, 0 ), 2, 1 ); 
    	//imshow("Tracking", frame); 
    	//tracker->init(frame, bbox);
				
			while(cap.read(frame)){

//////////////////////// can do image processing here  ///////////////////////////////////////////

			cap >> frame;
			if(!frame.data){
				continue;
			}
			
			vector<Rect> found, found_filtered;
			
			hog.detectMultiScale(frame, found, 0, Size(8,8), Size(32,32), 1.05, 2, false);
			
			size_t i, j;
			for (i=0; i<found.size(); i++){
	      Rect r = found[i];
        for (j=0; j<found.size(); j++)
	        if (j!=i && (r & found[j])==r) break;

        if (j==found.size()) found_filtered.push_back(r);
      }
      for (i=0; i<found_filtered.size(); i++){
	    	Rect r = found_filtered[i];
        r.x += cvRound(r.width*0.1);
	    	r.width = cvRound(r.width*0.8);
	    	r.y += cvRound(r.height*0.06);
	    	r.height = cvRound(r.height*0.9);
	    	rectangle(frame, r.tl(), r.br(), cv::Scalar(0,255,0), 2);
			}
    		
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
