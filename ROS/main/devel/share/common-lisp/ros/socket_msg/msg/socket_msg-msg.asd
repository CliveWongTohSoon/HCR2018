
(cl:in-package :asdf)

(defsystem "socket_msg-msg"
  :depends-on (:roslisp-msg-protocol :roslisp-utils :std_msgs-msg
)
  :components ((:file "_package")
    (:file "socketMsg" :depends-on ("_package_socketMsg"))
    (:file "_package_socketMsg" :depends-on ("_package"))
  ))