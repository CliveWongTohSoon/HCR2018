# socketMsg.msg

Header header
string type # To match which data to take {type: 'facial_recognition', eye_pos_x: pos_x, eye_pos_y: pos_y }

float32 eye_pos_x
float32 eye_pos_y

# Status of the delivery
# has 4 states: 'to_dest', 'arrived_destination', 'to_origin', 'arrived_origin'
string status 
float64 pos_x
float64 pos_y
float64 pos_z
float64 orient_x
float64 orient_y
float64 orient_z
float64 orient_w

# Keyboard
string key

# Battery State
int32 motor_state
float32 voltage
float64 linear_x
float64 linear_y
float64 linear_z
float64 angular_x
float64 angular_y
float64 angular_z