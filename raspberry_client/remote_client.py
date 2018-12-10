#! /usr/bin/python3

import termios
import tty
import select
import sys
from socketIO_client_nexus import SocketIO, LoggingNamespace
from gpiozero import Motor
from time import sleep

cloud_url = 'http://ec2-35-176-128-102.eu-west-2.compute.amazonaws.com'
local_url = 'localhost'
socketIO=SocketIO(cloud_url, 9000, LoggingNamespace)

motor1 = Motor(14,15)

is_allowed = True

def isData():
    return select.select([sys.stdin], [], [], 0) == ([sys.stdin], [], [])

def mock_rasp_input():
    # Change the is_allowed
    old_settings = termios.tcgetattr(sys.stdin)

    try:
        tty.setcbreak(sys.stdin.fileno())

        while True:
            if isData():
                c = sys.stdin.read(1)
                print(c)
                if c == 'a':
                    is_allowed = True
                    socketIO.emit('box', {'authorised': is_allowed})
                elif c == 's':
                    is_allowed = False
                    socketIO.emit('box', {'authorised': is_allowed})
                if c == '\x1b':         # x1b is ESC
                    break
    finally:
        termios.tcsetattr(sys.stdin, termios.TCSADRAIN, old_settings)

def box_status(*args):
    data = args[0]
    if data == "open":
        print ("open")
        motor1.forward()
        #motor_pos.on()
        #motor_neg.off()
        sleep(2)
    elif data =="close":
        print("close")
        motor1.backward()
        #motor_pos.off()  # for closing
        #motor_neg.on()
        sleep(2)
    motor1.stop()
    sleep(2)
    #motor_pos.off()  # for stop
    #motor_neg.off()

if __name__ == "__main__":
    socketIO.on('box', box_status)
    # TODO:- Logic for alarm system
    # mock_rasp_input will change the variable is_allowed to be sent to socket
    mock_rasp_input()
