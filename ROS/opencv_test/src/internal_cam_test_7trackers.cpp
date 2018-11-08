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
			// List of tracker types in OpenCV 3.4.1
    	string trackerTypes[7] = {"BOOSTING", "MIL", "KCF", "TLD","MEDIANFLOW", "GOTURN", "MOSSE"};
    	// vector <string> trackerTypes(types, std::end(types));
 
    	// Create a tracker
    	string trackerType = trackerTypes[1];
 
	    Ptr<Tracker> tracker;
 
  	  #if (CV_MINOR_VERSION < 3)
  	  {
  	  	tracker = Tracker::create(trackerType);
    	}
    	#else
    	{
        if (trackerType == "BOOSTING")
            tracker = TrackerBoosting::create();
        if (trackerType == "MIL")
            tracker = TrackerMIL::create();
        if (trackerType == "KCF") // unusable
            tracker = TrackerKCF::create();
        if (trackerType == "TLD") // unusable
            tracker = TrackerTLD::create();
        if (trackerType == "MEDIANFLOW") // unusable
            tracker = TrackerMedianFlow::create();
        if (trackerType == "GOTURN") // unusable
            tracker = TrackerGOTURN::create();
        if (trackerType == "MOSSE")
            tracker = TrackerMOSSE::create();
			}
    	#endif
		
			VideoCapture cap(0); // open video camera no. 0
			if(!cap.isOpened()){ // if not, exit program
				cout << "Cannot open video cam" << endl;
			}
			
			Mat frame;
			
			cap.read(frame); // read a new frame from video

			// Define initial bounding box 
    	Rect2d bbox(200, 40, 200, 230);
    	// Display bounding box. 
    	rectangle(frame, bbox, Scalar( 255, 0, 0 ), 2, 1 ); 
    	imshow("Tracking", frame); 
    	tracker->init(frame, bbox);
				
			while(cap.read(frame)){

//////////////////////// can do image processing here  ///////////////////////////////////////////

				// Start timer
        double timer = (double)getTickCount();
         
        // Update the tracking result
        bool ok = tracker->update(frame, bbox);
         
        // Calculate Frames per second (FPS)
        float fps = getTickFrequency() / ((double)getTickCount() - timer);
         
        if (ok)
        {
        	// Tracking success : Draw the tracked object
          rectangle(frame, bbox, Scalar( 255, 0, 0 ), 2, 1 );
        }
        else
        {
          // Tracking failure detected.
          putText(frame, "Tracking failure detected", Point(100,80), FONT_HERSHEY_SIMPLEX, 0.75, Scalar(0,0,255),2);
        }
         
        // Display tracker type on frame
        putText(frame, trackerType + " Tracker", Point(100,20), FONT_HERSHEY_SIMPLEX, 0.75, Scalar(50,170,50),2);
         
        // Display FPS on frame
        putText(frame, "FPS : " + SSTR(int(fps)), Point(100,50), FONT_HERSHEY_SIMPLEX, 0.75, Scalar(50,170,50), 2);				

    		
//////////////////////////////////////////////////////////////////////////////////////////////////				
				
				imshow("Tracking", frame);
				
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
