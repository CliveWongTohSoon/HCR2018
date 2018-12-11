#! /usr/bin/python3
import termios
import tty
import select
import sys
from socketIO_client_nexus import SocketIO, LoggingNamespace
from time import sleep

class RaspSocket:
    def __init__(self):
        url = "http://ec2-35-176-128-102.eu-west-2.compute.amazonaws.com"
        url_local = 'localhost'
        self.socketIO = SocketIO(url_local, 9000, LoggingNamespace)
        
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
                        self.socketIO.emit('box', {'type': 'alarm', 'authorised': self.is_safe})
                    elif c == 's':
                        self.is_safe = False
                        self.socketIO.emit('box', {'type': 'alarm', 'authorised': self.is_safe})
                    if c == '\x1b':         # x1b is ESC
                        break
        finally:
            termios.tcsetattr(sys.stdin, termios.TCSADRAIN, old_settings)
    
    def listen_to_door(self):
        # TODO:- If the contact is closed, return True
        sleep(5)
        print('Door is closed!')
        return True

    def open_box(self, open):
        print('Box is opened: ', open)
        if open:
            # TODO:- Open the box logic here
            print('Opening the box...')
        
        # Wait for 30s
        sleep(10)

        # Listen to the door
        while True:
            door_closed = self.listen_to_door()
            if door_closed:
                break
        
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