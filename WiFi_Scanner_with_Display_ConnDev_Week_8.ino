/*
 * This sketch was created for Connected Devices - Spring 2021 - ITP / NYU.
 * 
 * This sketch connects an Arduino to WiFi (and requires a 'secrets.h' file (here named "arduino secrets").
 * In the file, you could include your network's wifi name (as SECRET_SSDI) and password (as SECRET_PASS) as follows
#define SECRET_SSID "YourNetworkName"
#define SECRET_PASS "YourPassword"

I combined the sketches (with very minor modifications):
 https://github.com/tigoe/Wifi101_examples/blob/master/WiFi_Connection_Examples/WiFI_Reconnect/WiFI_Reconnect.ino (for the WiFi)
 https://github.com/tigoe/display-examples/blob/main/OLED_Examples/SSD1306_OLED_Example/SSD1306_OLED_Example.ino (for the display)

 The code functions as follows:
 check for connection
 connect / reconnect
 when connected show signal strength

The code loops:
clearing the display
setting text size
setting text color
placing the cursor
'writing' the first line (with title then reading)
moving the cursor for the second line
'writing' the second line (with the units label for the reading)
finally, displaying what's written onto the display
THIS PROCESS ACTS AS A SCREEN REFRESH

NOTE: One change for this code was to change WiFiNINA.h to WiFi_Generic.h as I couldn't not load WiFiNINA.
 */
// include libraries for display
// see https://learn.adafruit.com/adafruit-gfx-graphics-library/using-fonts
// for a list of fonts available in the GFX lib
// or custom fonts from http://oleddisplay.squix.ch/#/home
#include <Wire.h>
#include <Adafruit_SSD1306.h>
#include <Fonts/FreeSans9pt7b.h>

//include libraries for Wifi
#include <WiFiNINA_Generic.h> //used with Nano 33 IoT
//#include <WiFiNINA.h>   // use this for MKR1010 or Nano 33 IoT if you have WiFiNINA instead of WiFiNINA_Generic.
//#include <WiFi101.h>  // this should work for MKR1000
// you'll need to create a new tab called arduino_secrets.h and include SSID & Password (See header notes)
#include "arduino_secrets.h"

//DEFINE display settings
#define SCREEN_WIDTH 128 // OLED DISPLAY WIDTH IN PX
#define SCREEN_HEIGHT 32 // OLED DISPLAY HEIGHT IN PX
#define OLED_RESET 0 // SETTING RESET PIN FOR DIPLAY (0 OR -1 IF NO RESET PIN)

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);


void setup() {
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);
  connectToNetwork();

  if (!display.begin(SSD1306_SWITCHCAPVCC, 0X3C)) {
    Serial.println("Display setup failure");
    while(true);
  }

  // set front for the display
  display.setFont(&FreeSans9pt7b);
  Serial.println("Display is functioning!");
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    connectToNetwork();
  }

//DISPLAY COMMANDS - since in loop, this refreshes the screen clearing and adding new data repeatedly
//prepping for display
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0,12);
  //print WiFi Strength label
  display.print("WiFi Strength:");
  //move the cursor down for next line w/ strength & label
  display.setCursor(0,30);
  //print WiFi Strength & units label)
  display.print(WiFi.RSSI());
  display.print(" dBm");
  //push printed info to the screen
  display.display();
}

//function for connecting to the WiFi Network
void connectToNetwork(){
  //try to connect to network
  while (WiFi.status() != WL_CONNECTED) {
    digitalWrite(LED_BUILTIN, LOW);
    Serial.print("Attempting to connect to Network named: ");
    Serial.println(SECRET_SSID);
    //connect to WPA/WPA2 network:
    WiFi.begin(SECRET_SSID, SECRET_PASS);
  }
  digitalWrite(LED_BUILTIN, HIGH);
  if (Serial) Serial.print("Connected to: ");
  if (Serial) Serial.println(WiFi.SSID());
}
