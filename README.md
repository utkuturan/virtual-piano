# 🎹 Virtual Piano JS

A web-based interactive piano application featuring real-time audio playback and an algorithmic "Jukebox" mode that plays predefined songs automatically.

🔗 **Live Demo:** [Click Here to Play!](https://utkuturan.github.io/virtual-piano/)

![Project Status](https://img.shields.io/badge/Status-Live-success)
![Technology](https://img.shields.io/badge/Tech-Vanilla%20JS-yellow)

## 🚀 Features

* **Multi-Input Support:** Play using **Mouse Clicks**, **Keyboard Keys**, or **Touch Screen** (Mobile/Tablet optimized with low-latency response).
* **Jukebox Mode:** An automated song player powered by a custom asynchronous JavaScript algorithm that handles tempo, note duration, and rhythm precision.
* **Visual Feedback:** Real-time visual cues (`active-state`) when notes are played manually or automatically.
* **Smart State Management:** Includes a "Stop" functionality to interrupt the async loop and clear queued timeouts instantly.

## 🛠️ Technologies Used

* **Frontend:** HTML5, CSS3 (Flexbox/Grid)
* **Logic:** Vanilla JavaScript (ES6+)
* **Key Concepts:**
    * DOM Manipulation
    * Asynchronous Programming (`setTimeout`, Event Loop)
    * Object-Oriented Data Structures (Song mapping)
    * Mobile Touch Events (`touchstart` implementation)

## 🎵 How It Works (The Engineering Part)

The core of the auto-play feature relies on a custom **scheduling engine**. It parses a song data structure (note + duration), calculates the cumulative time offset (`accumulatedTime`) for each note, and schedules audio events. This ensures precise rhythm execution without blocking the main thread.
