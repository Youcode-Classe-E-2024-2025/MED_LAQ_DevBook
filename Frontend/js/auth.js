document.getElementById("showRegister").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("loginForm").classList.add("hidden");
  document.getElementById("registerForm").classList.remove("hidden");
});

document.getElementById("showLogin").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("registerForm").classList.add("hidden");
  document.getElementById("loginForm").classList.remove("hidden");
});
