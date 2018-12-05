[Good Link](http://docs.ros.org/kinetic/api/catkin/html/howto/format2/cpp_msg_dependencies.html)

# Create a custom message file
You may want to publish something in a struct/class such that only one publisher is needed for multiple data transfers (e.g. battery state, motor state, etc)

* Create a new ROS package, e.g. custom_msgs. I have already created a custom_msgs package so all that is needed to to create a ***.msg*** file under custom_msgs/msg/.s
* Look for the code below and add your new msg to it

```
add_message_files(
  FILES
  robotInfo.msg
  **add you new message file here**.msg 
)
```
### To use your new msg file
* Go to the package where you want to use it. 
* Include it in the CMakeLists.txt like so (custom_msgs):
```
find_package(catkin REQUIRED COMPONENTS
  geometry_msgs
  .
  .
  .
  custom_msgs 
  .
  .
  .
)
```
and also in 
```
catkin_package(
  CATKIN_DEPENDS custom_msgs ...
)
```

Lastly include them in your package xml as a
```xml
  <build_depend>custom_msgs</build_depend>
  <build_export_depend>custom_msgs</build_export_depend>
```
In your file you should now be able to reference your new msg file like so :
````
#include <custom_msgs/robotInfo.h>

custom_msgs::robotInfo robot_Info;
// do stuff with my new robot_Info
// e.g.
robot_Info.voltage = battery_msg-> voltage;
```

### If you are not using the custom_msgs package and are creating a whole new one [please have a look here](http://www.hotblackrobotics.com/en/blog/2018/02/26/ros-custom-messages/)
* Use catkin_create_pkg to make a new package. It is ideal to create one package to store all custom data types.
* Create a new folder called msg and place your new .msg inside there. It can contain types such as int32 or float32. Refer online for the exact types.
* Follow the tutorial and add the required dependencies to both the package xml and CMakeLists.txt
