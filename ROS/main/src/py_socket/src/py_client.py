#!/usr/bin/env python

import rospy
from socketIO_client_nexus import SocketIO, LoggingNamespace
from socket_msg.msg import socketMsg
import threading


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
        url = "http://ec2-35-176-128-102.eu-west-2.compute.amazonaws.com"
        url_local = 'localhost'
        self.socketIO = SocketIO(url, 9000, LoggingNamespace)
        self.pub = rospy.Publisher('webserver_ros', socketMsg, queue_size=10)
        self.sub = rospy.Subscriber('webserver', socketMsg, self.call_back)
        
        self.facial_recognition_counter = 0
        self.prev_s = ""
        self.counter = 0

        # Listen to socket
        self.listen_to_socket('webserver_ros')

        # Listen to destination
        self.listen_to_socket('destination')

        self.socketIO.wait()

    def on_message(self, *args):
        msg = args[0]
        if msg['type'] == 'key_input':
            socket_msg = socketMsg()
            socket_msg.type = msg['type']
            print(msg['data'])
            socket_msg.key = msg['data']
            self.pub.publish(socket_msg)
        elif msg['type'] == 'dispatch':
            print(msg['data'])
            # TOOD:- Listen to a ros topic
            set_interval(self.mock_wrapper, 1)
    
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

    def emit_to_socket(self, eventName: str, status: str, data):
        self.socketIO.emit(eventName, {
                'status': status,
                'data': data
        })

    def listen_to_socket(self, eventName: str):
        self.socketIO.on(eventName, self.on_message)

    def match_message(self, msg):
        msg_type = msg.type
        print('Socket heard message type: ', msg_type)
        if msg_type == 'facial_recognition':
            eye_pos_x = msg.eye_pos_x
            eye_pos_y = msg.eye_pos_y
            return {'eye_pos_x': eye_pos_x, 'eye_pos_y': eye_pos_y}
        else:
            return 'Error Type'

    def call_back(self, msg):
        if self.facial_recognition_counter > 10:
            s = self.match_message(msg)
            
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
