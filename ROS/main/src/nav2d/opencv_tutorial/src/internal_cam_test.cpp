#include <ros/ros.h>
#include <cv_bridge/cv_bridge.h>
#include <opencv2/highgui/highgui.hpp>
#include <iostream>

using namespace std;
using namespace cv;

class cam_test{
	public:
		cam_test(){
			VideoCapture cap(CV_CAP_ANY);//open the video camera no. 0
			
				if(!cap.isOpened()) //if not success, exit program
				{
					cout << "Cannot open the video cam" << endl;
				}
				
				double dWidth = cap.get(CV_CAP_PROP_FRAME_WIDTH);//get the width of frames of the video
				double dHeight = cap.get(CV_CAP_PROP_FRAME_HEIGHT);//get the height of frames of the video
				
				cout << "Frame size: " << dWidth << " x " << dHeight << endl;
				
				namedWindow("MyVideo", CV_WINDOW_AUTOSIZE); //create a window called MyVideo
				
				while(1)
				{
					Mat frame;
					
					bool bSuccess = cap.read(frame); // read a new frame from video
					
					if(!bSuccess) //if not success, break loop
					{
						cout << "Cannot read a frame from video stream" << endl;
						break;
					}
							imshow("MyVideo",frame);
					if(waitKey(30) == 27) //wait for 'esc' keypress for 30ms. If 'esc' key is pressed, break loop
					{
						cout << "esc key is pressed by user" << endl;
						break;
					}
				}
		}
		
		~cam_test(){
			cvDestroyWindow("Camera_Output"); // Destroy Window
		}
};

int main(int argc, char **argv)
{
	//Set up ROS
	ros::init(argc, argv, "internal_cam_test");
	cam_test cam_object;
	
	ROS_INFO("Cam Tested!");
}
