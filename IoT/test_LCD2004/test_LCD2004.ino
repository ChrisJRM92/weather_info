#include <Wire.h>
#include <LiquidCrystal_I2C.h>

#define D3 0 //GPIO0
#define D4 2 //GPIO2

LiquidCrystal_I2C lcd(0x27, 20, 4);

void setup() {
  Wire.begin(D3, D4);
  lcd.begin(20, 4);
  lcd.backlight();
}

void loop() {
  lcd.setCursor(0, 0); // Set cursor 0 column 0 row
  lcd.print("Test passed!");
  lcd.setCursor(3, 1);
  lcd.print("Enjoy!"); 
  delay(1000); 
  lcd.clear();

  lcd.setCursor(0, 0);
  lcd.print("Test passed!");
  lcd.setCursor(3, 2);
  lcd.print("Enjoy!"); 
  delay(1000); 
  lcd.clear();

  lcd.setCursor(0, 0);
  lcd.print("Test passed!");
  lcd.setCursor(3, 3);
  lcd.print("Enjoy!"); 
  delay(1000); 
  lcd.clear();

}