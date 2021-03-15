/*
THIS WAS CREATED USING THE EXAMPLE serialport FOR CONNECTED DEVICES.
CODE CAN BE FOUND HERE: https://github.com/tigoe/html-for-conndev/tree/main/serialport
*/

// Declare Variables for the DOM elements
let portSelector;
let redButton;
let redStatus = "off";
let lightStatus = 0;

// Create serialport object
let serial;

// Set the states for the serial input from the buttons/Arduino_JSON
let lastButtonStateR = 0;

// Create Setup() function that runs when the page is loaded
function setup(event){
    // Get and create event listener for RED Button
    redButton = document.getElementById('red');
    redButton.addEventListener('click', setRedState);


    // Initialize serial port object:
    serial = new p5.SerialPort();
    serial.on('list', printList);
    serial.on('data', serialEvent);
    serial.list();

    // Run functions to set initial states of BUTTONS
    setRedState();
}

// Create functions for STATES of Buttons
// Function for RED Button
function setRedState(){
  // change value depending on current state's value:
  if (redButton.value == "on"){
    redButton.value = "off";
    serial.write(lightStatus)
  } else {
    redButton.value = "on";
    serial.write(lightStatus)


  }

  if (redButton.value == "on") {
      redStatus = "on";
    } else {
      redStatus = "off";

    }

  // check to see if any of the buttons are on.
  attnOn();
}


// Function to CHECK THE STATES of the BUTTONS
function attnOn() {
  let thisSpan =  document.getElementById('attention');
  if (redStatus == "on")  {
    let ATTNmessage = "<p id=\"attentionD\" align =\"center\"><span id=\"attentionP\">ATTN:<br\>VISITOR WAITING<br\><\span><\p>";
    thisSpan.innerHTML = ATTNmessage;
  }else {
    thisSpan.innerHTML = "";
  }
}

// Function to CHANGE BACKGROUND COLOR when clicking w MOUSE
  //background changes code - followed example from https://stackoverflow.com/questions/31089414/javascript-change-background-color-on-click

// Make Function to create an object for the SERIAL PORT SELECTOR:
function printList(portList) {
  // make a select object
  portSelector = document.getElementById('portSelector');
  //establis portSelector as an array of these object with Loop
  for (var i = 0; i < portList.length; i++){
    //push each port name to the dropdown menu
    var option = document.createElement("option");
    option.text = portList[i];
    portSelector.add(option);
  }
  // add an event listener for when the port is changed in dropdown:
  portSelector.addEventListener('change', openPort);
}

// Function to OPEN Port
function openPort() {
  let item = portSelector.value;
  // CLOSE any open ports
  if (serial.serialport != null){
    serial.close();
  }
  // OPEN the new selected port
  serial.open(item);
}

// SERIAL EVENT FUNCTION (modified for each color button)
function serialEvent() {
  //read line of incoming data
  var inData = serial.readLine();
  // if the line isn't empty, parse it to JSON
  if (inData) {
    var sensors = JSON.parse(inData);
    // if the button has changed and is pressed, take an action
    //RED BUTTON
    if (sensors.buttonR !== lastButtonStateR) {
      if (sensors.buttonR === 0){
        setRedState(sensors.buttonR);
      }
    // save button's value for next time
    lastButtonStateR = sensors.buttonR;
    //GREEN BUTTON
  }
  }
}

// Add a listener for the SETUP() function above for the page to LOAD:
window.addEventListener('DOMContentLoaded', setup);
