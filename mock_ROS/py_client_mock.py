#!/usr/bin/env python

from socketIO_client_nexus import SocketIO, LoggingNamespace
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
        
        self.facial_recognition_counter = 0
        self.prev_s = ""
        self.counter = 0

        # Listen to socket
        self.listen_to_socket('webserver_ros')
        
        # Mock subscribe to topic in ROS

        self.socketIO.wait()

    def on_message(self, *args):
        msg = args[0]
        print(msg)
        if msg['type'] == 'key_input':
            self.publish_key(msg)
        elif msg['type'] == 'dispatch':
            self.publish_goal(msg['data'])
            # set_interval(self.mock_wrapper, 1)

    def publish_key(self, msg):
        print('Received Key: ', msg)

    def publish_goal(self, msg_data):
        print('Received Goal:', msg_data)
        set_interval(self.mock_wrapper, 1)

    def mock_wrapper(self):
        if self.counter <= 10:
            self.emit_to_socket('ros', 'to_dest', {
                'x': self.counter,
                'y': self.counter, 
                'z': self.counter
            })
        elif self.counter > 10 and self.counter <= 20:
            self.emit_to_socket('ros', 'arrived_destination', {
                'x': self.counter,
                'y': self.counter, 
                'z': self.counter
            })
        elif self.counter > 20 and self.counter <= 30:
            self.emit_to_socket('ros', 'to_origin', {
                'x': self.counter,
                'y': self.counter, 
                'z': self.counter
            })
        else:
            self.emit_to_socket('ros', 'arrived_origin', {
                'x': self.counter,
                'y': self.counter, 
                'z': self.counter
            })
        
        self.counter += 1

    def emit_to_socket(self, eventName, status, data, msg_type='status'):
        self.socketIO.emit(eventName, {
                'type': msg_type, 
                'content': {
                    'status': status,
                    'data': data
                }
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
                        }
                    }
                }
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
    pySocket = PySocket()
