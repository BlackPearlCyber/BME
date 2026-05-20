Demo prototype workspace

Files added:
- `arduino/arduino_nano/main.ino` — Arduino Nano sketch (MAX30102 sensor output to Serial)
- `esp32/esp32_main/main.ino` — ESP32 sketch (reads Serial2, Telegram scaffold)
- `web/index.html`, `web/style.css`, `web/app.js` — simple demo UI to simulate incoming sensor data

How to use the demo UI:

1. Open `web/index.html` in a browser, or use Live Server/any static server.
2. Use the "Simulate Serial Input" box to paste or type values like `78,98` (heart,spo2) and click Send.
3. Use Randomize to generate example readings. Use SOS and Simulate Fall to show alerts.

Presentation tips:
- You can mirror the browser window on the projector. The UI simulates serial input, so no hardware is required for the demo.
- To demo the full hardware flow, connect the Arduino to the ESP32 via Serial (TX/RX -> RX2/TX2) and stream `"bpm,spo2\n"` lines from the Arduino.

Want me to: commit these files to git, add a short screencast, or wire up a real serial-to-web bridge? Reply with which one.

Presentation page:
- `web/presentation.html` — A single-page presentation that summarizes the project and embeds the live demo (`web/index.html`). If you open the files locally and the iframe is blank, run a simple static server (examples below) and then open http://localhost:8000/web/presentation.html in your browser.

Quick static server (from the `demo-prototype` folder):
```bash
python -m http.server 8000
# or, with Python 2:
# python -m SimpleHTTPServer 8000
```# BME
