
(cl:in-package :asdf)

(defsystem "custom_msgs-msg"
  :depends-on (:roslisp-msg-protocol :roslisp-utils :std_msgs-msg
)
  :components ((:file "_package")
    (:file "robotInfo" :depends-on ("_package_robotInfo"))
    (:file "_package_robotInfo" :depends-on ("_package"))
  ))