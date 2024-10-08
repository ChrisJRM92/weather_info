const int ledPin = 2; // D4 en NodeMCU

void setup() {
  // Configuramos el pin del LED como salida
  pinMode(ledPin, OUTPUT);
}

void loop() {
  digitalWrite(ledPin, HIGH); // Enciende el LED
  delay(1000);                // Espera 1 segundo (1000 ms)
  digitalWrite(ledPin, LOW);  // Apaga el LED
  delay(1000);                // Espera 1 segundo
}