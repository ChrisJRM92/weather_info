#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#define D3 0 //GPIO0
#define D4 2 //GPIO2

LiquidCrystal_I2C lcd(0x27, 20, 4);

//Wifi Credentials
const char* ssid = "SSID"; //Your SSID
const char* password = "PASSWORD"; //Your Password

void setup() {
  //LCD
  Wire.begin(D3, D4);
  lcd.begin(20, 4);
  lcd.backlight();
  lcd.setCursor(0, 0); // Set cursor 0 column 0 row
  lcd.print("Welcome!");
  delay(4000);
  lcd.clear();


  //Wifi
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    lcd.setCursor(0, 0);
    lcd.print("Connecting");
    lcd.setCursor(10, 0);
    lcd.print(".");
    delay(500);
    lcd.setCursor(11, 0);
    lcd.print(".");
    delay(500);
    lcd.setCursor(12, 0);
    lcd.print(".");
    delay(500);
    lcd.clear();
  }
  
  lcd.setCursor(0, 0);
  lcd.print("Connec. established");

  // HTTP Request
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;

    http.begin(client, "http://www.google.com");
    int httpCode = http.GET(); // Get Request

    if (httpCode > 0) { 
      lcd.setCursor(0, 1);
      lcd.print("Host: www.google.com");
      lcd.setCursor(0, 2);
      lcd.print("Status code: ");
      lcd.setCursor(13, 2);
      lcd.print(httpCode);
    } else {
      lcd.setCursor(0, 1);
      lcd.print("Error: ");
      lcd.setCursor(8, 1);
      lcd.print(httpCode);

    }
    http.end(); 
  } else {
    lcd.setCursor(0, 1);
    lcd.print("Connecction Error");
  }
}

void loop() {
  
}