/*
 * Troubleshot this code against the Example "StateChangeDetection" fron the ARduino IDE. 
 * Eventually, I rearraged my code to match to finally get it to work after several hours.
 */
 /*
THIS WAS CREATED USING THE EXAMPLE serialport FOR CONNECTED DEVICES.
CODE CAN BE FOUND HERE: https://github.com/tigoe/html-for-conndev/tree/main/serialport
*/

#include <Arduino_JSON.h>

// setup the input pins
const int buttonPinR = 2;
const int ledPinR = 3;

// create variables to hold prev states
int buttonStatusR = 0;
int lastButtonStateR = HIGH;
int incomingByte;

// check if any inputs have changed

// set up a JSON object to hold the info you want to send to p5 Serial Control
JSONVar outgoing;

//run setup and loop functions
void setup() {
  // initialize serial baud and set input pin modes
  Serial.begin(9600);
  pinMode(buttonPinR, INPUT_PULLUP);
  pinMode(ledPinR, OUTPUT);

  
  // intialize values in JSON object created
  outgoing["buttonR"] = 0;
}

void loop() {
  int buttonStateR = digitalRead(buttonPinR);

  if (Serial.available() > 0) {   // see if there's incoming serial data
   incomingByte = Serial.read(); 
  //read inputs
  buttonStateR = incomingByte;
  }
  
  // if the RED button has changed
  if (buttonStateR != lastButtonStateR) {
     outgoing["buttonR"] = buttonStateR;
    if (buttonStateR == HIGH) {
      // if the current state is HIGH then the button went from off to on:
      buttonStatusR++;
      Serial.println(buttonStatusR);
    }
        delay(10);
    }
 lastButtonStateR = buttonStateR;
 Serial.println(outgoing);



if (buttonStatusR % 2 == 0) {
    digitalWrite(ledPinR, HIGH);
  } else {
    digitalWrite(ledPinR, LOW);
  }
}
