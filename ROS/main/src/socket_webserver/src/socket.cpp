#include <ros/ros.h>
#include <sio_client.h>
#include <sstream>
#include <socket_msg/socketMsg.h>
#include <string>

using namespace std;

class Socket{
    public:
        Socket() {
            h.connect("http://ec2-35-176-128-102.eu-west-2.compute.amazonaws.com:9000");
            // h.connect("http://localhost:9000");

            sub = n.subscribe("webserver", 1000, &Socket::callback, this);
        }

        string matchMessageToSocket(const socket_msg::socketMsg::ConstPtr& msg) {
            string msgType = msg->type;
            cout << "Socket heard message type: " + msgType << endl;
            stringstream ss;

            if(msgType == "facial_recognition") {
                float eye_pos_x = msg->eye_pos_x;
                float eye_pos_y = msg->eye_pos_y;
                ss << "{\"eye_pos_x\":" << eye_pos_x << ", \"eye_pos_y\":" << eye_pos_y << "}";
                return ss.str();
            } else {
                return "Error Type";
            }
        }

        void callback(const socket_msg::socketMsg::ConstPtr& msg) {
            stringstream ss;

            if (facial_recognition_counter > 10) {
                string s = matchMessageToSocket(msg);
                
                if (s.compare(prev_s) != 0) { 
                    // If they are not equal, so we don't have to update same data to the server
                    cout << "They are not equal!" << endl;
                    // Emit to the socket
                    h.socket()->emit("ros", s);
                    prev_s = s;
                }

                // Reset counter
                facial_recognition_counter = 0;
            } else {
                cout << "Caching..." << facial_recognition_counter << endl;
                facial_recognition_counter++;
            }
            
            ros::spinOnce();
        }
    
    private:
        ros::NodeHandle n;
        ros::Subscriber sub;
        ros::Publisher pub;
        sio::client h;
        socket_msg::socketMsg socket_msg;
        string prev_s = "";
        int facial_recognition_counter = 0;
};

int main(int argc, char* argv[]) {

    ros::init(argc, argv, "socket");

    // Initialise the socket class
    Socket s;

    ros::spin();
    return 0;
}
