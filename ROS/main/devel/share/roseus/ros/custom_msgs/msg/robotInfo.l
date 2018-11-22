;; Auto-generated. Do not edit!


(when (boundp 'custom_msgs::robotInfo)
  (if (not (find-package "CUSTOM_MSGS"))
    (make-package "CUSTOM_MSGS"))
  (shadow 'robotInfo (find-package "CUSTOM_MSGS")))
(unless (find-package "CUSTOM_MSGS::ROBOTINFO")
  (make-package "CUSTOM_MSGS::ROBOTINFO"))

(in-package "ROS")
;;//! \htmlinclude robotInfo.msg.html
(if (not (find-package "STD_MSGS"))
  (ros::roseus-add-msgs "std_msgs"))


(defclass custom_msgs::robotInfo
  :super ros::object
  :slots (_header _motor_state _voltage _linear_x _linear_y _linear_z _angular_x _angular_y _angular_z ))

(defmethod custom_msgs::robotInfo
  (:init
   (&key
    ((:header __header) (instance std_msgs::Header :init))
    ((:motor_state __motor_state) 0)
    ((:voltage __voltage) 0.0)
    ((:linear_x __linear_x) 0.0)
    ((:linear_y __linear_y) 0.0)
    ((:linear_z __linear_z) 0.0)
    ((:angular_x __angular_x) 0.0)
    ((:angular_y __angular_y) 0.0)
    ((:angular_z __angular_z) 0.0)
    )
   (send-super :init)
   (setq _header __header)
   (setq _motor_state (round __motor_state))
   (setq _voltage (float __voltage))
   (setq _linear_x (float __linear_x))
   (setq _linear_y (float __linear_y))
   (setq _linear_z (float __linear_z))
   (setq _angular_x (float __angular_x))
   (setq _angular_y (float __angular_y))
   (setq _angular_z (float __angular_z))
   self)
  (:header
   (&rest __header)
   (if (keywordp (car __header))
       (send* _header __header)
     (progn
       (if __header (setq _header (car __header)))
       _header)))
  (:motor_state
   (&optional __motor_state)
   (if __motor_state (setq _motor_state __motor_state)) _motor_state)
  (:voltage
   (&optional __voltage)
   (if __voltage (setq _voltage __voltage)) _voltage)
  (:linear_x
   (&optional __linear_x)
   (if __linear_x (setq _linear_x __linear_x)) _linear_x)
  (:linear_y
   (&optional __linear_y)
   (if __linear_y (setq _linear_y __linear_y)) _linear_y)
  (:linear_z
   (&optional __linear_z)
   (if __linear_z (setq _linear_z __linear_z)) _linear_z)
  (:angular_x
   (&optional __angular_x)
   (if __angular_x (setq _angular_x __angular_x)) _angular_x)
  (:angular_y
   (&optional __angular_y)
   (if __angular_y (setq _angular_y __angular_y)) _angular_y)
  (:angular_z
   (&optional __angular_z)
   (if __angular_z (setq _angular_z __angular_z)) _angular_z)
  (:serialization-length
   ()
   (+
    ;; std_msgs/Header _header
    (send _header :serialization-length)
    ;; int32 _motor_state
    4
    ;; float32 _voltage
    4
    ;; float64 _linear_x
    8
    ;; float64 _linear_y
    8
    ;; float64 _linear_z
    8
    ;; float64 _angular_x
    8
    ;; float64 _angular_y
    8
    ;; float64 _angular_z
    8
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;; std_msgs/Header _header
       (send _header :serialize s)
     ;; int32 _motor_state
       (write-long _motor_state s)
     ;; float32 _voltage
       (sys::poke _voltage (send s :buffer) (send s :count) :float) (incf (stream-count s) 4)
     ;; float64 _linear_x
       (sys::poke _linear_x (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _linear_y
       (sys::poke _linear_y (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _linear_z
       (sys::poke _linear_z (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _angular_x
       (sys::poke _angular_x (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _angular_y
       (sys::poke _angular_y (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _angular_z
       (sys::poke _angular_z (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;; std_msgs/Header _header
     (send _header :deserialize buf ptr-) (incf ptr- (send _header :serialization-length))
   ;; int32 _motor_state
     (setq _motor_state (sys::peek buf ptr- :integer)) (incf ptr- 4)
   ;; float32 _voltage
     (setq _voltage (sys::peek buf ptr- :float)) (incf ptr- 4)
   ;; float64 _linear_x
     (setq _linear_x (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _linear_y
     (setq _linear_y (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _linear_z
     (setq _linear_z (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _angular_x
     (setq _angular_x (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _angular_y
     (setq _angular_y (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _angular_z
     (setq _angular_z (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;;
   self)
  )

(setf (get custom_msgs::robotInfo :md5sum-) "c36e39f387f1c959a0562f682e3dcd21")
(setf (get custom_msgs::robotInfo :datatype-) "custom_msgs/robotInfo")
(setf (get custom_msgs::robotInfo :definition-)
      "# robotInfo.msg

Header header
int32 motor_state
float32 voltage
# Linear/ Angular velocities 
float64 linear_x
float64 linear_y
float64 linear_z
float64 angular_x
float64 angular_y
float64 angular_z
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



(provide :custom_msgs/robotInfo "c36e39f387f1c959a0562f682e3dcd21")


