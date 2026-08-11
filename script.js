document.addEventListener("DOMContentLoaded", function() {
    const textArray = [
      // "I'm a Web Developer"
    ];
    let index = 0;
    const spanElement = document.getElementById("typedText");
  
    function typeText() {
      const currentText = textArray[index];
      let charIndex = 0;
      const typingInterval = setInterval(() => {
        if (charIndex < currentText.length) {
          spanElement.textContent += currentText.charAt(charIndex);
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            spanElement.textContent = "";
            index = (index + 1) % textArray.length;
            typeText();
          }, 2000);
        }
      }, 100);
    }
  
    typeText();
  });
  
document.querySelector.getElementById('submit-btn').addEventListener('submit',()=>{
  alert("Message Sent Successfully");
});