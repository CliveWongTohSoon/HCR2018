#include <ros/ros.h>
#include <sio_client.h>
#include <sstream>
#include <std_msgs/String.h>

using namespace std;

class Socket{
    public:
        Socket() {
            h.connect("http://localhost:5000");
            sub = n.subscribe("webserver", 1000, &Socket::callback, this);
        }

        void callback(const std_msgs::String::ConstPtr& msg) {
            std_msgs::String pub_str;
            stringstream ss;

            ss << "Socket heard: " << msg->data.c_str();

            pub_str.data = ss.str();

            cout << pub_str.data.c_str() << endl;

            h.socket()->emit("ros", ss.str());

            ros::spinOnce();
        }
    
    private:
        ros::NodeHandle n;
        ros::Subscriber sub;
        ros::Publisher pub;
        sio::client h;
};

int main(int argc, char* argv[]) {

    ros::init(argc, argv, "socket");

    // Initialise the socket class
    Socket s;

    ros::spin();
    return 0;
}
