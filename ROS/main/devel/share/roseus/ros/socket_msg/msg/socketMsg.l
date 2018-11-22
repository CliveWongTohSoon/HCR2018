;; Auto-generated. Do not edit!


(when (boundp 'socket_msg::socketMsg)
  (if (not (find-package "SOCKET_MSG"))
    (make-package "SOCKET_MSG"))
  (shadow 'socketMsg (find-package "SOCKET_MSG")))
(unless (find-package "SOCKET_MSG::SOCKETMSG")
  (make-package "SOCKET_MSG::SOCKETMSG"))

(in-package "ROS")
;;//! \htmlinclude socketMsg.msg.html
(if (not (find-package "STD_MSGS"))
  (ros::roseus-add-msgs "std_msgs"))


(defclass socket_msg::socketMsg
  :super ros::object
  :slots (_header _type _eye_pos_x _eye_pos_y _status _x _y _z ))

(defmethod socket_msg::socketMsg
  (:init
   (&key
    ((:header __header) (instance std_msgs::Header :init))
    ((:type __type) "")
    ((:eye_pos_x __eye_pos_x) 0.0)
    ((:eye_pos_y __eye_pos_y) 0.0)
    ((:status __status) "")
    ((:x __x) 0.0)
    ((:y __y) 0.0)
    ((:z __z) 0.0)
    )
   (send-super :init)
   (setq _header __header)
   (setq _type (string __type))
   (setq _eye_pos_x (float __eye_pos_x))
   (setq _eye_pos_y (float __eye_pos_y))
   (setq _status (string __status))
   (setq _x (float __x))
   (setq _y (float __y))
   (setq _z (float __z))
   self)
  (:header
   (&rest __header)
   (if (keywordp (car __header))
       (send* _header __header)
     (progn
       (if __header (setq _header (car __header)))
       _header)))
  (:type
   (&optional __type)
   (if __type (setq _type __type)) _type)
  (:eye_pos_x
   (&optional __eye_pos_x)
   (if __eye_pos_x (setq _eye_pos_x __eye_pos_x)) _eye_pos_x)
  (:eye_pos_y
   (&optional __eye_pos_y)
   (if __eye_pos_y (setq _eye_pos_y __eye_pos_y)) _eye_pos_y)
  (:status
   (&optional __status)
   (if __status (setq _status __status)) _status)
  (:x
   (&optional __x)
   (if __x (setq _x __x)) _x)
  (:y
   (&optional __y)
   (if __y (setq _y __y)) _y)
  (:z
   (&optional __z)
   (if __z (setq _z __z)) _z)
  (:serialization-length
   ()
   (+
    ;; std_msgs/Header _header
    (send _header :serialization-length)
    ;; string _type
    4 (length _type)
    ;; float32 _eye_pos_x
    4
    ;; float32 _eye_pos_y
    4
    ;; string _status
    4 (length _status)
    ;; float32 _x
    4
    ;; float32 _y
    4
    ;; float32 _z
    4
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;; std_msgs/Header _header
       (send _header :serialize s)
     ;; string _type
       (write-long (length _type) s) (princ _type s)
     ;; float32 _eye_pos_x
       (sys::poke _eye_pos_x (send s :buffer) (send s :count) :float) (incf (stream-count s) 4)
     ;; float32 _eye_pos_y
       (sys::poke _eye_pos_y (send s :buffer) (send s :count) :float) (incf (stream-count s) 4)
     ;; string _status
       (write-long (length _status) s) (princ _status s)
     ;; float32 _x
       (sys::poke _x (send s :buffer) (send s :count) :float) (incf (stream-count s) 4)
     ;; float32 _y
       (sys::poke _y (send s :buffer) (send s :count) :float) (incf (stream-count s) 4)
     ;; float32 _z
       (sys::poke _z (send s :buffer) (send s :count) :float) (incf (stream-count s) 4)
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;; std_msgs/Header _header
     (send _header :deserialize buf ptr-) (incf ptr- (send _header :serialization-length))
   ;; string _type
     (let (n) (setq n (sys::peek buf ptr- :integer)) (incf ptr- 4) (setq _type (subseq buf ptr- (+ ptr- n))) (incf ptr- n))
   ;; float32 _eye_pos_x
     (setq _eye_pos_x (sys::peek buf ptr- :float)) (incf ptr- 4)
   ;; float32 _eye_pos_y
     (setq _eye_pos_y (sys::peek buf ptr- :float)) (incf ptr- 4)
   ;; string _status
     (let (n) (setq n (sys::peek buf ptr- :integer)) (incf ptr- 4) (setq _status (subseq buf ptr- (+ ptr- n))) (incf ptr- n))
   ;; float32 _x
     (setq _x (sys::peek buf ptr- :float)) (incf ptr- 4)
   ;; float32 _y
     (setq _y (sys::peek buf ptr- :float)) (incf ptr- 4)
   ;; float32 _z
     (setq _z (sys::peek buf ptr- :float)) (incf ptr- 4)
   ;;
   self)
  )

(setf (get socket_msg::socketMsg :md5sum-) "9611119fdc604d3e59abd191b890ce09")
(setf (get socket_msg::socketMsg :datatype-) "socket_msg/socketMsg")
(setf (get socket_msg::socketMsg :definition-)
      "# socketMsg.msg

Header header
string type # To match which data to take {type: 'facial_recognition', eye_pos_x: pos_x, eye_pos_y: pos_y }

float32 eye_pos_x
float32 eye_pos_y

string status
float32 x
float32 y
float32 z
# the rest of the data for the socket
================================================================================
MSG: std_msgs/Header
# Standard metadata for higher-level stamped data types.
# This is generally used to communicate timestamped data 
# in a particular coordinate frame.
# 
# sequence ID: consecutively increasing ID 
uint32 seq
#Two-integer timestamp that is expressed as:
# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')
# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')
# time-handling sugar is provided by the client library
time stamp
#Frame this data is associated with
# 0: no frame
# 1: global frame
string frame_id

")



(provide :socket_msg/socketMsg "9611119fdc604d3e59abd191b890ce09")


