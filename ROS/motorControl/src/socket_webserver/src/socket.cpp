#include <ros/ros.h>
#include <sio_client.h>
#include <sstream>
#include <socket_msg/socketMsg.h>
#include <string>

using namespace std;

class Socket{
    public:
        Socket() {
            h.connect("http://localhost:5000");
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
            } else if (msgType == "battery_Voltage"){
                 ss << "{\"battery_voltage\":" << msg->voltage<<  "}";
            }else if (msgType == "motor_state"){
                 ss << "{\"motor_state\":" << msg->motor_state<<  "}";
            }else if (msgType == "motor_velocities"){
                    ss << "{" ;
                    ss << "\"linear_x\":" << msg-> linear_x << ",";
                    ss << "\"linear_y\":" << msg-> linear_y << ",";
                    ss << "\"linear_z\":" << msg-> linear_z << ",";
                    ss << "\"angular_x\":" << msg-> angular_x << ",";
                    ss << "\"angular_y\":" << msg-> angular_y << ",";
                    ss << "\"angular_z\":" << msg-> angular_z;
                    ss<<  "}";
            }
            else {
                return "Error Type";
            }
            return ss.str();
        }
        void callback(const socket_msg::socketMsg::ConstPtr& msg) {
            stringstream ss;

            string s = matchMessageToSocket(msg);

            h.socket()->emit("ros", s);

            ros::spinOnce();
        }
    
    private:
        ros::NodeHandle n;
        ros::Subscriber sub;
        ros::Publisher pub;
        sio::client h;
        socket_msg::socketMsg socket_msg;
          
};

int main(int argc, char* argv[]) {

    ros::init(argc, argv, "socket");

    // Initialise the socket class
    Socket s;

    ros::spin();
    return 0;
}
