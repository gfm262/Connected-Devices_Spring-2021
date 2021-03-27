/*
  WiFi reconnect

  This example shows how to check for connection
  continually and re-connect to a network
  if you lose the connection. If connected, it prints
  the signal strength.
  Uses the following libraries:
  http://librarymanager/All#WiFiNINA
  or
  http://librarymanager/All#WiFi101

  Combined codes for WiFi_Reconnect.ino and SSD1306_OLED_Example.ino
  https://github.com/tigoe/display-examples/blob/main/OLED_Examples/SSD1306_OLED_Example/SSD1306_OLED_Example.ino

  created 1 Mar 2018
  updated 11 Jan 2021
  by Tom Igoe
*/
#include <Wire.h>
#include <Adafruit_SSD1306.h>
//code from https://github.com/tigoe/display-examples/blob/main/OLED_Examples/SSD1306_OLED_Example/SSD1306_OLED_Example.ino
// see https://learn.adafruit.com/adafruit-gfx-graphics-library/using-fonts
// for a list of fonts available in the GFX lib
// or custom fonts from http://oleddisplay.squix.ch/#/home
#include <Fonts/FreeSans9pt7b.h>
#define SCREEN_WIDTH 128 // OLED display width, in px
#define SCREEN_HEIGHT 32 // OLED DISPLAY HEIGHT, in px
#define OLED_RESET 0 // setting the reset pin for display (0 or -1 if no reset pin)


#include <WiFiNINA_Generic.h>   // use this for MKR1010 or Nano 33 IoT
//#include <WiFi101.h>  // use this for MKR1000

// put your network SSID and password in
// a tab called arduino_secrets.h:
#include "arduino_secrets.h"

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);


void setup() {
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);
  connectToNetwork();

  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("Display setup failed");
    while(true);
  }
    // set fonts botforh display:
    display.setFont(&FreeSans9pt7b);
    Serial.println("Display is goooood to goooo!");
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    connectToNetwork();
  }

  // clear the display:
  display.clearDisplay();
  // set the text size to 1:
  display.setTextSize(1);
  // set the text color to white:
  display.setTextColor(SSD1306_WHITE);
  // move the cursor to 0,0:
  display.setCursor(0, 12);
  // print the seconds:
  display.print("WiFi RSSI: ");
  display.print(WiFi.RSSI());
  // move the cursor down 20 pixels:
  display.setCursor(0, 30);
  // print a sensor reading:
  display.print(" dBm");
  //display.print(sensorReadingMapped);
  // push everything out to the screen:
  display.display();
//  if (Serial) Serial.print("WiFi RSSI: ");
//  if (Serial) Serial.print(WiFi.RSSI());
//  if (Serial) Serial.println( " dBm");
}

void connectToNetwork() {
  // try to connect to the network:
  while ( WiFi.status() != WL_CONNECTED) {
    digitalWrite(LED_BUILTIN, LOW);
    Serial.print("Attempting to connect to Network named: ");
    Serial.println(SECRET_SSID);       // print the network name (SSID);
    // Connect to WPA/WPA2 network:
    WiFi.begin(SECRET_SSID, SECRET_PASS);
  }
  digitalWrite(LED_BUILTIN, HIGH);
  // print the SSID of the network you're attached to:
  //if (Serial) Serial.print("Connected to: ");
  //if (Serial) Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address:
 // IPAddress ip = WiFi.localIP();
  //if (Serial) Serial.print("IP Address: ");
 // if (Serial) Serial.println(ip);
}
