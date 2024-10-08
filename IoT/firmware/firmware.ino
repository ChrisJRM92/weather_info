#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

#define D3 0 //GPIO0
#define D4 2 //GPIO2

LiquidCrystal_I2C lcd(0x27, 20, 4);

//Wifi Credentials
const char* ssid = "SSID"; //Your SSID
const char* password = "PASSWORD"; //Your Password

//Api credentials
const char* apiKey = "YourApiKey"; //ApiKey
const char* city = "YourCity";    //Your city
const String baseURL = "http://api.openweathermap.org/data/2.5/weather?q=" + String(city) + "&appid=" + String(apiKey) + "&units=metric";


void setup() {
  //LCD
  Serial.begin(115200);
  Wire.begin(D3, D4);
  lcd.begin(20, 4);
  lcd.backlight();
  lcd.setCursor(0, 0); // Set cursor 0 column 0 row
  lcd.print("Welcome!");
  delay(4000);
  lcd.clear();
  connectToWiFi();
}

void loop() {
if (WiFi.status() == WL_CONNECTED) {
    delay(120000);
    getWeatherData();
  } else {
    lcd.print("Loss connecction...");
    delay(5000);
    connectToWiFi();
  }
}

void connectToWiFi(){
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
  lcd.clear();
  loop();
}

void getWeatherData(){
  HTTPClient http;
  WiFiClient client;

  http.begin(client, baseURL);
  int httpCode = http.GET();

  if(httpCode > 0) {
    String payload = http.getString();
    Serial.println(payload);

    DynamicJsonDocument doc(1024);
    deserializeJson(doc, payload);

    float temp = doc["main"]["temp"];
    String city = doc["name"];
    float Long = doc["coord"]["lon"];
    float Lat = doc["coord"]["lat"];
    String sys = doc["sys"]["country"];
    Serial.println(temp);
    Serial.println(city);
    Serial.println(Long);
    Serial.println(Lat);
    Serial.println(sys);
    lcd.setCursor(0,0);
    lcd.print("Ciudad: ");
    lcd.setCursor(8,0);
    lcd.print(city);
    lcd.setCursor(14,0);
    lcd.print(sys);
    lcd.setCursor(0,1);
    lcd.print("T. Ambiente: ");
    lcd.setCursor(13,1);
    lcd.print(temp);
    lcd.setCursor(18,1);
    lcd.print("C");
    lcd.setCursor(0, 2);
    lcd.print("Lg: ");
    lcd.setCursor(4, 2);
    lcd.print(Long);
    lcd.setCursor(11, 2);
    lcd.print("Lt: ");
    lcd.setCursor(15, 2);
    lcd.print(Lat);

    long timestamp = doc["dt"];
    timestamp -= 18000;
    time_t rawtime = timestamp;
    struct tm* timeinfo = gmtime(&rawtime);
    char buffer[30];
    strftime(buffer, sizeof(buffer), "%Y-%m-%d %H:%M:%S", timeinfo);
    lcd.setCursor(0,3);
    lcd.print(buffer);

  } else {
    lcd.setCursor(0, 0);
    lcd.print("Err. solicitud HTTP");
    lcd.setCursor(0, 2);
    lcd.print("Error HTTP: ");
    lcd.print(httpCode);
  }
  http.end();
}