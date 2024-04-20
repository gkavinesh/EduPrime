const textContainer = document.getElementById('logo');
const text = "EduPrime";
let index = 0;
let typing = true;
let typingSpeed = 300; // Adjust typing speed (in milliseconds)

function updateText() {
  if (typing) {
    // Append the next character to the text container
    textContainer.textContent += text[index];
    index++;

    // Check if the whole text has been typed
    if (index >= text.length) {
      typing = false;
      
      // Pause before starting the erase process
      setTimeout(() => {
        typingSpeed = 200; // Adjust erasing speed (in milliseconds)
      }, 1000); // Adjust pause time (in milliseconds)
    }
  } else {
    // Erase the typed text from the text container
    textContainer.textContent = textContainer.textContent.slice(0, -1);
    
    // Check if the text has been completely erased
    if (textContainer.textContent === "") {
      typing = true;
      index = 0;
      typingSpeed = 250; // Reset typing speed
    }
  }
}

// Call the updateText function with the specified typing speed
setInterval(updateText, typingSpeed);

