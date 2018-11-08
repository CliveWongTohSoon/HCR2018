#include <ros/ros.h>
#include <cv_bridge/cv_bridge.h>
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/opencv.hpp>
#include <opencv2/tracking.hpp>
#include <opencv2/objdetect.hpp>
#include <opencv2/core/ocl.hpp>
#include <opencv2/core/core.hpp>
#include <opencv2/imgcodecs.hpp>
#include <opencv2/imgproc.hpp>
#include <opencv2/videoio.hpp>
#include <opencv2/video.hpp>
#include <libfreenect.hpp>
#include <pthread.h>

#include <iostream>
#include <sstream>
#include <string.h>
#include <stdio.h>
#include <math.h>

using namespace std;
using namespace cv;

// Convert to string
#define SSTR( x ) static_cast< std::ostringstream & >( \
( std::ostringstream() << std::dec << x ) ).str()
#define CV_NO_BACKWARD_COMPATIBILITY
#define FREENECTOPENCV_WINDOW_D "Depthimage"
#define FREENECTOPENCV_WINDOW_N "Normalimage"
#define FREENECTOPENCV_RGB_DEPTH 3
#define FREENECTOPENCV_DEPTH_DEPTH 1
#define FREENECTOPENCV_RGB_WIDTH 640
#define FREENECTOPENCV_RGB_HEIGHT 480
#define FREENECTOPENCV_DEPTH_WIDTH 640
#define FREENECTOPENCV_DEPTH_HEIGHT 480

Mat depthimg, rgbimg, tempimg, canny_temp, canny_img;

pthread_mutex_t mutex_depth = PTHREAD_MUTEX_INITIALIZER;
pthread_mutex_t mutex_rgb = PTHREAD_MUTEX_INITIALIZER;
pthread_t cv_thread;
 
// callback for depthimage, called by libfreenect
void depth_cb(freenect_device *dev, void *depth, uint32_t timestamp)
 
{
    Mat depth8;
    Mat mydepth = Mat( FREENECTOPENCV_DEPTH_WIDTH,FREENECTOPENCV_DEPTH_HEIGHT, CV_16UC1, depth);

    mydepth.convertTo(depth8, CV_8UC1, 1.0/4.0);
    pthread_mutex_lock( &mutex_depth );
    memcpy(depthimg.data, depth8.data, 640*480);
    // unlock mutex
    pthread_mutex_unlock( &mutex_depth );
 
}
 
// callback for rgbimage, called by libfreenect
 
void rgb_cb(freenect_device *dev, void *rgb, uint32_t timestamp)
{
 
    // lock mutex for opencv rgb image
    pthread_mutex_lock( &mutex_rgb );
		memcpy(rgbimg.data,rgb,(FREENECTOPENCV_RGB_WIDTH+0)*(FREENECTOPENCV_RGB_HEIGHT+950));    
		//memcpy(rgbimg.data, rgb, FREENECT_VIDEO_RGB_SIZE);
    // unlock mutex
    pthread_mutex_unlock( &mutex_rgb );
}
 
/*
 * thread for displaying the opencv content
 */
void *cv_threadfunc (void *ptr) {
    depthimg = Mat(FREENECTOPENCV_DEPTH_HEIGHT, FREENECTOPENCV_DEPTH_WIDTH, CV_8UC1);
    rgbimg = Mat(FREENECTOPENCV_RGB_HEIGHT, FREENECTOPENCV_RGB_WIDTH, CV_8UC3);
    tempimg = Mat(FREENECTOPENCV_RGB_HEIGHT, FREENECTOPENCV_RGB_WIDTH, CV_8UC3);
    canny_img = Mat(FREENECTOPENCV_RGB_HEIGHT, FREENECTOPENCV_RGB_WIDTH, CV_8UC1);
    canny_temp = Mat(FREENECTOPENCV_DEPTH_HEIGHT, FREENECTOPENCV_DEPTH_WIDTH, CV_8UC3);

    // use image polling
    while (1)
    {
        //lock mutex for depth image
        pthread_mutex_lock( &mutex_depth );
        Canny(depthimg, canny_temp, 50.0, 200.0, 3);
        cvtColor(depthimg,tempimg,CV_GRAY2BGR);
        cvtColor(tempimg,tempimg,CV_HSV2BGR);

        imshow(FREENECTOPENCV_WINDOW_D,tempimg);
        imshow("Depth Canny", canny_temp);
        //unlock mutex for depth image
        pthread_mutex_unlock( &mutex_depth );

        //lock mutex for rgb image
        pthread_mutex_lock( &mutex_rgb );

        cvtColor(rgbimg,tempimg,CV_BGR2RGB);
        cvtColor(tempimg, canny_img, CV_BGR2GRAY);

        imshow(FREENECTOPENCV_WINDOW_N, tempimg);

        Canny(canny_img, canny_img, 50.0, 200.0, 3);

        imshow("Canny Image", canny_img);
        //unlock mutex
        pthread_mutex_unlock( &mutex_rgb );

        // wait for quit key
        if(cvWaitKey(15) == 27)
            break;

    }
    pthread_exit(NULL);

    return NULL;

}

//class cam_test{
//	public:
//		cam_test(){		

//		}
//};

int main(int argc, char **argv){
	ros::init(argc, argv, "internal_cam_test");
				freenect_context *f_ctx;
	    freenect_device *f_dev;
 
  	  int res = 0;
  	  int die = 0;
  	  printf("Kinect camera test\n");
 
  	  if (freenect_init(&f_ctx, NULL) < 0)
  	  {
  	      printf("freenect_init() failed\n");
  	      return 1;
  	  }
 
  	  if (freenect_open_device(f_ctx, &f_dev, 0) < 0)
  	  {
  	      printf("Could not open device\n");
  	      return 1;
  	  }
 
  	  freenect_set_depth_callback(f_dev, depth_cb);
  	  freenect_set_video_callback(f_dev, rgb_cb);
  	  freenect_set_video_format(f_dev, FREENECT_VIDEO_RGB);
 
  	  // create opencv display thread
  	  res = pthread_create(&cv_thread, NULL, cv_threadfunc, NULL);
  	  if (res)
  	  {
  	      printf("pthread_create failed\n");
  	      return 1;
  	  }
  	  printf("init done\n");
 
  	  freenect_start_depth(f_dev);
  	  freenect_start_video(f_dev);
 
  	  while(!die && freenect_process_events(f_ctx) >= 0 );
	ROS_INFO("Cam tested!");
}
