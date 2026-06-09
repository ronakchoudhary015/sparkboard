const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxuaSsIjgh4apEw5dmSuOHwKfhALDZOXK14ZVmLyKgVZ53WP6DxszxqbCO5-CcYQbfD/exec";

// Waitlist Form
const emailForm = document.getElementById("emailForm");

if (emailForm) {
  emailForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const successMsg = document.getElementById("successMsg");
    const email = emailInput.value.trim();

    if (!email) return;

    successMsg.classList.remove("hidden");
    successMsg.textContent = "Joining waitlist...";

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      emailInput.value = "";
      successMsg.textContent = "You're on the list 🎉";
    } catch (error) {
      successMsg.textContent = "Something went wrong. Try again.";
    }
  });
}

// Sparkboard Countdown Timer
const launchDate = new Date("2026-07-10T00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = launchDate - now;

  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minsEl = document.getElementById("cd-mins");
  const secsEl = document.getElementById("cd-secs");

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  if (distance <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minsEl.textContent = "00";
    secsEl.textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const mins = Math.floor(
    (distance % (1000 * 60 * 60)) / (1000 * 60)
  );
  const secs = Math.floor(
    (distance % (1000 * 60)) / 1000
  );

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minsEl.textContent = String(mins).padStart(2, "0");
  secsEl.textContent = String(secs).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
