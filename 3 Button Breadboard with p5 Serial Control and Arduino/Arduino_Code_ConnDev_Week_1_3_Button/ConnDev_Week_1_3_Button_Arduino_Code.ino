/*
 * THIS WAS CREATED USING THE EXAMPLE serialport FOR CONNECTED DEVICES.
CODE CAN BE FOUND HERE: https://github.com/tigoe/html-for-conndev/tree/main/serialport

 * JSON serial sending
  Reads sensors and formats them as a JSON object, then sends
  the resulting object as a JSON string out the serial port.
  Uses the following library:
  https://librarymanager/All#Arduino_JSON
  Circuit:
  - Pushbutton connected to pin D2 and to ground
  - Potentiometer connected to pin A0

  created 12 Jan 2021
  by Tom Igoe
 * 
 */
#include <Arduino_JSON.h>

// setup the input pins
const int buttonPinR = 2;
const int buttonPinG = 3;
const int buttonPinB = 5;

// create variables to hold prev states
int lastButtonStateR = HIGH;
int lastButtonStateG = HIGH;
int lastButtonStateB = HIGH;

// check if any inputs have changed
bool anyInputsChanged = false;

// set up a JSON object to hold the info you want to send to p5 Serial Control
JSONVar outgoing;

//run setup and loop functions
void setup() {
  // initialize serial baud and set input pin modes
  Serial.begin(9600);
  pinMode(buttonPinR, INPUT_PULLUP);
  pinMode(buttonPinG, INPUT_PULLUP);
  pinMode(buttonPinB, INPUT_PULLUP);

  // intialize values in JSON object created
  outgoing["buttonR"] = 0;
  outgoing["buttonG"] = 0;
  outgoing["buttonB"] = 0;
}

void loop() {
  //read inputs
  int buttonStateR = digitalRead(buttonPinR);
  int buttonStateG = digitalRead(buttonPinG);
  int buttonStateB = digitalRead(buttonPinB);
  
  // if the RED button has changed
  if (buttonStateR != lastButtonStateR){
    outgoing["buttonR"] = buttonStateR;
    //save state for next time
    lastButtonStateR = buttonStateR;
    //notify of change
    anyInputsChanged = true;
  }

  //if the GREEN button's changed
  if (buttonStateG != lastButtonStateG){
    outgoing["buttonG"] = buttonStateG;
    //save state for next time
    lastButtonStateG = buttonStateG;
    //notify of change
    anyInputsChanged = true;
  }
    
  // if the BLUE button's changed
  if (buttonStateB != lastButtonStateB){
    outgoing["buttonB"] = buttonStateB;
    //save state for next time
    lastButtonStateB = buttonStateB;
    //notify of change
    anyInputsChanged = true;
  }
  
  // IF THERE HAS BEEN A CHANGE, SEND IT VIA SERIAL!
  if (anyInputsChanged) {
    Serial.println(outgoing);
    //clear change flag
    anyInputsChanged = false;
  }
}
