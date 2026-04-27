const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxuaSsIjgh4apEw5dmSuOHwKfhALDZOXK14ZVmLyKgVZ53WP6DxszxqbCO5-CcYQbfD/exec";

document.getElementById("emailForm").addEventListener("submit", async function (e) {
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
