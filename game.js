```javascript
// ===============================
// AUTO TYPER
// ===============================

let text = "";
let position = 0;

let typing = false;
let paused = false;

let startTime = null;
let timer = null;

let speed = 50;


// ===============================
// SPEED SLIDER
// ===============================

function updateSpeed() {

  speed = Number(
    document.getElementById("speedSlider").value
  );

  document.getElementById("speedDisplay").textContent =
    speed;
}


// ===============================
// START TYPING
// ===============================

function startTyping() {

  text = document.getElementById("textInput").value;

  if (text.length === 0) {

    alert("Please enter some text first!");

    return;
  }


  // Continue after pause
  if (paused) {

    paused = false;

    document.getElementById("status").textContent =
      "Typing...";

    typeNextCharacter();

    return;
  }


  // Prevent starting twice
  if (typing) {
    return;
  }


  typing = true;
  paused = false;

  position = 0;

  document.getElementById("typingArea").value = "";

  startTime = Date.now();

  document.getElementById("status").textContent =
    "Typing...";


  typeNextCharacter();
}


// ===============================
// TYPE NEXT CHARACTER
// ===============================

function typeNextCharacter() {

  // Stop if paused or stopped
  if (!typing || paused) {
    return;
  }


  // Check if finished
  if (position >= text.length) {

    typing = false;

    clearTimeout(timer);

    document.getElementById("status").textContent =
      "Finished! 🎉";

    updateStats();

    return;
  }


  // Add one character
  document.getElementById("typingArea").value +=
    text[position];

  position++;


  // Update statistics
  updateStats();


  // Type next character
  timer = setTimeout(
    typeNextCharacter,
    speed
  );
}


// ===============================
// PAUSE
// ===============================

function pauseTyping() {

  if (!typing) {
    return;
  }


  paused = true;

  clearTimeout(timer);

  document.getElementById("status").textContent =
    "Paused ⏸";
}


// ===============================
// STOP
// ===============================

function stopTyping() {

  typing = false;

  paused = false;

  clearTimeout(timer);

  document.getElementById("status").textContent =
    "Stopped 🛑";
}


// ===============================
// RESTART
// ===============================

function restartTyping() {

  clearTimeout(timer);

  typing = false;

  paused = false;

  position = 0;

  startTime = null;

  document.getElementById("typingArea").value =
    "";

  document.getElementById("status").textContent =
    "Ready";

  updateStats();
}


// ===============================
// CLEAR TEXT
// ===============================

function clearText() {

  stopTyping();

  document.getElementById("textInput").value =
    "";

  document.getElementById("typingArea").value =
    "";

  position = 0;

  startTime = null;

  document.getElementById("status").textContent =
    "Ready";

  updateStats();
}


// ===============================
// PASTE TEXT
// ===============================

async function pasteText() {

  try {

    const clipboard =
      await navigator.clipboard.readText();

    document.getElementById("textInput").value =
      clipboard;

  }

  catch (error) {

    alert(
      "Your browser blocked automatic pasting. Click the text box and press Ctrl + V."
    );

  }
}


// ===============================
// STATISTICS
// ===============================

function updateStats() {

  const currentText =
    document.getElementById("typingArea").value;


  // Characters
  document.getElementById("characters").textContent =
    currentText.length;


  // Words
  let words = 0;

  if (currentText.trim() !== "") {

    words =
      currentText.trim().split(/\s+/).length;
  }

  document.getElementById("words").textContent =
    words;


  // WPM
  if (
    startTime !== null &&
    currentText.length > 0
  ) {

    const seconds =
      (Date.now() - startTime) / 1000;

    const minutes =
      seconds / 60;


    if (minutes > 0) {

      const wpm =
        Math.round(words / minutes);

      document.getElementById("wpm").textContent =
        isFinite(wpm) ? wpm : 0;
    }

  }

  else {

    document.getElementById("wpm").textContent =
      "0";
  }


  // Auto typer is 100% accurate
  document.getElementById("accuracy").textContent =
    "100%";
}


// ===============================
// DARK MODE
// ===============================

function toggleDarkMode() {

  document.body.classList.toggle("dark");
}


// ===============================
// KEYBOARD SHORTCUTS
// ===============================

// Space = Pause / Resume
// Escape = Stop

document.addEventListener(
  "keydown",
  function(event) {

    // Don't activate shortcuts while typing
    // into a text box.

    if (
      event.target.tagName === "TEXTAREA" ||
      event.target.tagName === "INPUT"
    ) {
      return;
    }


    // Space
    if (event.code === "Space") {

      event.preventDefault();

      if (typing) {

        if (paused) {

          startTyping();

        } else {

          pauseTyping();

        }

      }

    }


    // Escape
    if (event.key === "Escape") {

      stopTyping();

    }

  }
);
```
