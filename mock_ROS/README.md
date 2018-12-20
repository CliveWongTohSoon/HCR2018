# Instruction
This repository contains code that mocks the logic of the desired function without the required environment. 

## face_detect.py
This file is mocking the package facial_recognition in the directory ROS. Packages such as `cv2`, `dlib`, and `socketio-client-nexus` are needed to execute this file. 

## mock_rasp.py
This file is mocking the box.py in the directory raspberry_client. This file is to ensure the message will be emitted and received through the socket establish on the server. Package `socketio-client-nexus` is needed to run this file. 

## py_client_mock.py
This file is mocking the package py_socket in the directory ROS. Package `socketio-client-nexus` is needed to run this file.  This script is to ensure the message can be exchanged between the socket established on the server.
