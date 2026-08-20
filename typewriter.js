document.addEventListener("DOMContentLoaded", () => {
  const eyebrow = document.querySelector(".hero .eyebrow.typewriter");
  if (!eyebrow) return;

  // Prepare text
  const text = eyebrow.textContent.trim();
  eyebrow.textContent = "";
  eyebrow.style.visibility = "hidden";

  const cursor = document.createElement("span");
  cursor.classList.add("cursor");
  eyebrow.appendChild(cursor);

  function typeWriter(element, text) {
    element.style.visibility = "visible";

    let i = 0;
    let lastTime = performance.now();

    function type(now) {
      const delta = now - lastTime;
      if (delta > 50) { // 50ms per character ~ smooth typing
        if (i < text.length) {
          // Add next character
          const charNode = document.createTextNode(text.charAt(i));
          eyebrow.insertBefore(charNode, cursor);
          i++;
        } else {
          // Done typing
          cursor.classList.add("hidden");
          return;
        }
        lastTime = now;
      }
      requestAnimationFrame(type);
    }

    requestAnimationFrame(type);
  }

  const body = document.body;

  function startTyping() {
    typeWriter(eyebrow, text);
  }

  // If body already visible
  if (getComputedStyle(body).opacity === "1") {
    startTyping();
  } else {
    body.addEventListener("transitionend", function handler(e) {
      if (e.propertyName === "opacity") {
        startTyping();
        body.removeEventListener("transitionend", handler);
      }
    });
  }
});