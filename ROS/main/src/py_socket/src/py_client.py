#!/usr/bin/env python

import rospy
from socketIO_client_nexus import SocketIO, LoggingNamespace
from socket_msg.msg import socketMsg
import threading
from geometry_msgs.msg import PoseStamped


def set_interval(func, sec):
    def func_wrapper():
        set_interval(func, sec)
        func()
    t = threading.Timer(sec, func_wrapper)
    t.start()
    return t


class PySocket:
    
    def __init__(self):
        # h.connect("http://ec2-35-176-128-102.eu-west-2.compute.amazonaws.com:9000");
        url = "http://ec2-52-56-122-124.eu-west-2.compute.amazonaws.com"
        url_local = 'localhost'
        self.socketIO = SocketIO(url, 9000, LoggingNamespace)
        self.pub = rospy.Publisher('webserver_ros', socketMsg, queue_size=10)
        
        self.to_origin_pub = rospy.Publisher('to_origin', socketMsg, queue_size=10)

        self.goal_pub = rospy.Publisher('goal', PoseStamped, queue_size=10)
        self.sub = rospy.Subscriber('webserver', socketMsg, self.call_back)
        
        self.facial_recognition_counter = 0
        self.prev_s = ""
        self.counter = 0

        # Listen to socket
        self.listen_to_socket('webserver_ros')

        self.socketIO.wait()

    def on_message(self, *args):
        msg = args[0]
        print(msg)
        if msg['type'] == 'key_input':
            self.publish_key(msg)
        elif msg['type'] == 'dispatch':
            self.publish_goal(msg['data'])
        elif msg['type'] == 'dispatch_to_origin':
            socket_msg = socketMsg()
            socket_msg.to_origin = True
            self.to_origin_pub.publish(socket_msg)
            self.publish_goal(msg['data'])
            # set_interval(self.mock_wrapper, 1)

    def publish_key(self, msg):
        print('Received Key: ', msg)
        socket_msg = socketMsg()
        socket_msg.type = msg['type']
        socket_msg.key = msg['data']
        self.pub.publish(socket_msg)

    def publish_goal(self, msg_data):
        print('Received Goal:', msg_data)
        pose_stamped = PoseStamped()
        pose_stamped.header.frame_id = 'map'
        pose_stamped.header.stamp = rospy.Time.now()
        
        pose_stamped.pose.position.x = msg_data['pos_x']
        pose_stamped.pose.position.y = msg_data['pos_y']
        pose_stamped.pose.position.z = msg_data['pos_z']

        pose_stamped.pose.orientation.x = msg_data['orient_x']
        pose_stamped.pose.orientation.y = msg_data['orient_y']
        pose_stamped.pose.orientation.z = msg_data['orient_z']
        pose_stamped.pose.orientation.w = msg_data['orient_w']
        self.goal_pub.publish(pose_stamped)

    def mock_wrapper(self):
        if self.counter <= 10:
            self.emit_to_socket('location', 'to_dest', {
                'x': self.counter,
                'y': self.counter, 
                'z': self.counter
            })
        elif self.counter > 10 and self.counter <= 20:
            self.emit_to_socket('location', 'arrived_destination', {
                'x': self.counter,
                'y': self.counter, 
                'z': self.counter
            })
        elif self.counter > 20 and self.counter <= 30:
            self.emit_to_socket('location', 'to_origin', {
                'x': self.counter,
                'y': self.counter, 
                'z': self.counter
            })
        else:
            self.emit_to_socket('location', 'arrived_origin', {
                'x': self.counter,
                'y': self.counter, 
                'z': self.counter
            })
        
        self.counter += 1

    def emit_to_socket(self, eventName, status, data):
        self.socketIO.emit(eventName, {
                'status': status,
                'data': data
        })

    def listen_to_socket(self, eventName):
        self.socketIO.on(eventName, self.on_message)

    def match_message(self, msg):
        msg_type = msg.type
        print('Socket heard message type: ', msg_type)
        
        if msg_type == 'facial_recognition':
            eye_pos_x = msg.eye_pos_x
            eye_pos_y = msg.eye_pos_y
            return {
                'type': 'facial_recognition',
                'content': {
                    'eye_pos_x': eye_pos_x, 
                    'eye_pos_y': eye_pos_y
                    }
                }
        elif msg_type == 'battery_voltage':
            return {
                'type': 'battery_voltage',
                'voltage': msg.voltage
                }
        elif msg_type == 'motor_state':
            return {
                'type': 'motor_state',
                'content': {
                    'motor_state': msg.motor_state
                    }
                }
        elif msg_type == 'motor_velocities':
            return {
                'type': 'velocity',
                'content': {
                    'linear_x': msg.linear_x,
                    'linear_y': msg.linear_y,
                    'linear_z': msg.linear_z,
                    'angular_x': msg.angular_x,
                    'angular_y': msg.angular_y,
                    'angular_z': msg.angular_z
                    }
                }
        elif msg_type == 'status':
            return {
                'type': 'status',
                'content': {
                    'status': msg.status, # has 4 states: 'to_dest', 'arrived_destination', 'to_origin', 'arrived_origin'
                    'data': {
                        'pos_x': msg.pos_x,
                        'pos_y': msg.pos_y,
                        'pos_z': msg.pos_z,
                        'orient_x': msg.orient_x,
                        'orient_y': msg.orient_y,
                        'orient_z': msg.orient_z,
                        'orient_w': msg.orient_w,
                        'distance': msg.distance
                        }
                    }
                }
        else:
            return 'Error Type'

    def call_back(self, msg):
        s = self.match_message(msg)
        
        # send if dealing with goal
        if (s['type'] == 'status'):
            self.socketIO.emit('ros', s)
        # otherwise slow down
        else: 
            if self.facial_recognition_counter > 10:
                if s != self.prev_s:
                    print('Prev_s and s are not equal, emitting socket...')
                    self.socketIO.emit('ros', s)
                    self.prev_s = s
                self.facial_recognition_counter = 0
            else:
                print('Caching...', self.facial_recognition_counter)
                self.facial_recognition_counter += 1


        

if __name__ == "__main__":
    rospy.init_node('py_socket')

    pySocket = PySocket()
