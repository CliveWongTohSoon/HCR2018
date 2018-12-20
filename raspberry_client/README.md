# Instruction
The remote_client.py contains the code to turn the motor and connect to the server. To connect to the socket established on the server, `socketio-client-nexus` is needed. As socket.io 2 will be used as the library to establish the websocket, `socketio-client-nexus` is needed on the python client. Package `gpiozero` can only be installed on Raspbian OS running on the Raspberry Pi. To run the logic in your local machine, please refer to the directory mock_ROS. 

# Packages required
* socketio-client-nexus
* gpiozero
