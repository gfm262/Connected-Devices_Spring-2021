/*
THIS WAS CREATED USING THE EXAMPLE serialport FOR CONNECTED DEVICES.
CODE CAN BE FOUND HERE: https://github.com/tigoe/html-for-conndev/tree/main/serialport
*/

// Declare Variables for the DOM elements
let portSelector;
let redButton;
let greenButton;
let blueButton;
let redStatus = "off";
let greenStatus = "off";
let blueStatus = "off";
let myTimer = 2000;
let excessiveClicks = 0;

// Create serialport object
let serial;

// Set the states for the serial input from the buttons/Arduino_JSON
let lastButtonStateR = 0;
let lastButtonStateG = 0;
let lastButtonStateB = 0;

// Create Setup() function that runs when the page is loaded
function setup(event){
    // Get and create event listener for RED Button
    redButton = document.getElementById('red');
    redButton.addEventListener('click', setRedState);
    // Get and create event listener for GREEN Button
    greenButton = document.getElementById('green');
    greenButton.addEventListener('click', setGreenState);
    // Get and create event listener for BLUE Button
    blueButton = document.getElementById('blue');
    blueButton.addEventListener('click', setBlueState);

    // Initialize serial port object:
    serial = new p5.SerialPort();
    serial.on('list', printList);
    serial.on('data', serialEvent);
    serial.list();

    // Run functions to set initial states of BUTTONS
    setRedState();
    setGreenState();
    setBlueState();
}

// Create functions for STATES of Buttons
// Function for RED Button
function setRedState(){
  // change value depending on current state's value:
  if (redButton.value == "on"){
    redButton.value = "off";
  } else {
    redButton.value = "on";
  }
  // get and modify span and contents
  let thisSpan = document.getElementById(redButton.id + 'Val');
  if (redButton.value == "on") {
    thisSpan.innerHTML = "This button is RED!";
    redStatus = "on";
  } else {
    thisSpan.innerHTML = "";
    redStatus = "off";
  }
  // check to see if any of the buttons are on.
  anyOn();
}

// Function for GREEN Button
function setGreenState(){
  // change value depending on current state's value:
  if (greenButton.value == "on"){
    greenButton.value = "off";
  } else {
    greenButton.value = "on";
  }
  // get and modify span and contents
  let thisSpan = document.getElementById(greenButton.id + 'Val');
  if (greenButton.value == "on") {
    thisSpan.innerHTML = "This button is GREEN!";
    greenStatus = "on";
  }else {
    thisSpan.innerHTML = "";
    greenStatus = 'off';
  }
  // check to see if any of the buttons are on.
  anyOn();
}

// Function for BLUE Button
function setBlueState(){
  // change value depending on current state's value:
  if (blueButton.value == "on"){
    blueButton.value = "off";
  } else {
    blueButton.value = "on";
  }
  // get and modify span and contents
  let thisSpan = document.getElementById(blueButton.id + 'Val');
  if (blueButton.value == "on"){
    thisSpan.innerHTML = "This button is BLUE!";
    blueStatus = "on";
  } else {
    thisSpan.innerHTML = ""
    blueStatus = "off";
  }
  // check to see if any of the buttons are on.
  anyOn();
}

// Function to CHECK THE STATES of the BUTTONS
function anyOn() {
  let thisSpan =  document.getElementById('echo');
  if (redStatus == "on" || greenStatus == "on" || blueStatus == "on")  {
    let echoImage = "<br\><img id=\"echoImage\" src=\"img/Echo.GIF\"> <br\> <p align =\"center\" id=\"echoP\">You now have an open line with the BUTTON GAME! <br\>(version 0.0.0.0.1) <\p>";
    thisSpan.innerHTML = echoImage;
  }else {
    thisSpan.innerHTML = "";
  }
}

// Function to CHANGE BACKGROUND COLOR when clicking w MOUSE
  //background changes code - followed example from https://stackoverflow.com/questions/31089414/javascript-change-background-color-on-click
function changeBG(color){
  document.body.style.background = color;
  if (myTimer > 500){
    myTimer -= 500
  }else{
    excessiveClicks += 1;
  }

  //DO SOMETHING ABOUT EXCESSIVE WARNING SCREENS
  //console.log("Before if statement excessiveClicks: " + excessiveClicks + " | Timer: " + myTimer)
  if (excessiveClicks == 2){
    myTimer = 0;
    //console.log("excessiveClicks: CLICKED" )
  }
  //Change the Background and Show Message; Timeout Message
  document.getElementById('useButtons').innerHTML = "<p align =\"center\">**AHEM** <br\>PLEASE, use the PUSH BUTTONS<br\>I took the time to make FOR YOU!<br\> (pretty please.)<\p>"
  let rainbow = "linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%), linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)"
  setTimeout(function(){ document.body.style.background = rainbow; document.getElementById('useButtons').innerHTML ="" }, myTimer)
}

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
    } else if (sensors.buttonG !== lastButtonStateG) {
      if (sensors.buttonG === 0) {
        setGreenState(sensors.buttonG);
      }
    // save the button's value for next time
    lastButtonStateG = sensors.buttonG;
    //BLUE BUTTON
    }else if (sensors.buttonB !== lastButtonStateB) {
      if (sensors.buttonB === 0) {
        setBlueState(sensors.buttonB);
      }
      // save button value for next time:
    lastButtonStateB = sensors.buttonB;
    }
  }
}

// Add a listener for the SETUP() function above for the page to LOAD:
window.addEventListener('DOMContentLoaded', setup);
