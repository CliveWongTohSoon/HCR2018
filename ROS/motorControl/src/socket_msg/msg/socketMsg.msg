# socketMsg.msg

Header header
string type # To match which data to take {type: 'facial_recognition', eye_pos_x: pos_x, eye_pos_y: pos_y }

float32 eye_pos_x
float32 eye_pos_y

string status
float32 x
float32 y
float32 z
# the rest of the data for the socket
int32 motor_state
float32 voltage
float64 linear_x
float64 linear_y
float64 linear_z
float64 angular_x
float64 angular_y
float64 angular_z