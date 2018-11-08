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
#include <openni2/OpenNI.h>

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
			VideoCapture cap(CAP_OPENNI); // open video camera no. 0
			cap.set( CAP_OPENNI_IMAGE_GENERATOR_OUTPUT_MODE, CAP_OPENNI_VGA_30HZ );
			cout << "FPS    " << cap.get( CAP_OPENNI_IMAGE_GENERATOR+CAP_PROP_FPS ) << endl;
			for(;;){

//////////////////////// can do image processing here  ///////////////////////////////////////////
				
				
				Mat frame;
				cap >> frame;

//////////////////////////////////////////////////////////////////////////////////////////////////				
				
				//imshow("Depth", frame);
				
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
