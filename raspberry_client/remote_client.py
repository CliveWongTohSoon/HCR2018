from socketIO_client_nexus import SocketIO, LoggingNamespace
from gpiozero import Motor
from time import sleep

cloud_url = 'http://ec2-35-176-128-102.eu-west-2.compute.amazonaws.com'
local_url = 'localhost'
socketIO=SocketIO(cloud_url, 9000, LoggingNamespace)

motor1 = Motor(14,15)

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

socketIO.on('box', box_status)

socketIO.wait()

