document.getElementById("emailForm").addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("successMsg").classList.remove("hidden");
});
