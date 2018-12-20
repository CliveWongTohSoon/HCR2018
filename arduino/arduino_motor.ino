void setup()
{
  Serial.begin(9600);
  pinMode(9, OUTPUT);          // sets the digital pin 9 as output
  pinMode(10, OUTPUT); 
  pinMode(12,INPUT);
  pinMode(13,INPUT);
}

void loop()
{
  if (digitalRead(12) && !digitalRead(13)){
    digitalWrite(9, HIGH);
    digitalWrite(10, LOW);// sets the digital pin 13 on
    //delay(1000);
     Serial.print("High") ;
  }
  
  else if (!digitalRead(12) && digitalRead(13)) {
    digitalWrite(9, LOW);
    digitalWrite(10, HIGH);// sets the digital pin 13 on
    //delay(1000);
     Serial.print("Low") ;
  }
  
  digitalWrite(9, LOW);
  digitalWrite(10, LOW);
  

  //digitalWrite(9, HIGH);
  //digitalWrite(10, LOW);// sets the digital pin 13 on
  //delay(5000);                  // waits for a second
  //digitalWrite(9, LOW);        // sets the digital pin 13 off
  //digitalWrite(10, LOW);
  //delay(1000);
  //digitalWrite(9, LOW);       // sets the digital pin 13 on
  //digitalWrite(10, HIGH); 
  //delay(1000);                  // waits for a second
  //digitalWrite(9, LOW);       // sets the digital pin 13 on
  //digitalWrite(10, LOW); 
  //delay(1000); 
  
  // waits for a second
}