#! /usr/bin/python3

import termios
import tty
import select
import sys
from socketIO_client_nexus import SocketIO, LoggingNamespace
from gpiozero import Motor
from time import sleep


class RaspSocket:
    def __init__(self):
        url = "http://ec2-35-176-128-102.eu-west-2.compute.amazonaws.com"
        url_local = 'localhost'
        self.socketIO = SocketIO(url_local, 9000, LoggingNamespace)
        
        self.motor1 = Motor(14, 15)

        self.is_safe = True
        # Listen to socket
        self.listen_to_socket('box')
        # Listen to alarm
        # self.mock_alarm_input()

    def isData(self):
        return select.select([sys.stdin], [], [], 0) == ([sys.stdin], [], [])

    def mock_alarm_input(self):
        # Change the is_allowed
        old_settings = termios.tcgetattr(sys.stdin)

        try:
            tty.setcbreak(sys.stdin.fileno())

            while True:
                if self.isData():
                    c = sys.stdin.read(1)
                    print(c)
                    if c == 'a':
                        self.is_safe = True
                        self.socketIO.emit(
                            'box', {'type': 'alarm', 'authorised': self.is_safe})
                    elif c == 's':
                        self.is_safe = False
                        self.socketIO.emit(
                            'box', {'type': 'alarm', 'authorised': self.is_safe})
                    if c == '\x1b':         # x1b is ESC
                        break
        finally:
            termios.tcsetattr(sys.stdin, termios.TCSADRAIN, old_settings)

    def listen_to_door(self):
        # TODO:- If the contact is closed, return True
        sleep(5)
        print('Door is closed!')
        return True
    
    def close_box(self):
        print("Closing the box...")
        self.motor1.backward()
        #motor_pos.off()  # for closing
        #motor_neg.on()
        sleep(2)
        self.motor1.stop()

    def open_box(self, open):
        print('Box is opened: ', open)

        if open:
            print('Opening the box...')
            self.motor1.forward()
            #motor_pos.on()
            #motor_neg.off()
            sleep(2)

        # Stop the motor
        self.motor1.stop()

        # Wait for 30s
        sleep(30)

        # Listen to the door
        while True:
            # TODO:- Logic of the door closing 
            door_closed = self.listen_to_door()
            if door_closed:
                break

        self.close_box()

        # Door is closed, emit to socket
        self.socketIO.emit('box', {'type': 'box_status', 'open': False})

    def on_message(self, *args):
        msg = args[0]
        print(msg)
        if msg['type'] == 'box_status':
            self.open_box(msg['open'] == True)
        else:
            print('Error type!')

    def listen_to_socket(self, eventName):
        self.socketIO.on(eventName, self.on_message)


if __name__ == "__main__":
    socket = RaspSocket()
    socket.socketIO.wait()
