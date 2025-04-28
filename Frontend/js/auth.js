// Toggle between login and register forms
document.querySelector("#showRegister").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("#loginForm").classList.add("hidden");
  document.querySelector("#registerForm").classList.remove("hidden");
});

document.querySelector("#showLogin").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("#registerForm").classList.add("hidden");
  document.querySelector("#loginForm").classList.remove("hidden");
});

// Login handler
document.querySelector("#loginForm button").addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#loginEmail").value;
  const password = document.querySelector("#loginPassword").value;

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      alert("Login successful!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "books.html";
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Login error:", error);
  }
});

// Register handler
document.querySelector("#registerForm button").addEventListener("click", async (e) => {
  e.preventDefault();
  const username = document.querySelector("#registerUsername").value;
  const email = document.querySelector("#registerEmail").value;
  const password = document.querySelector("#registerPassword").value;
  const confirmPassword = document.querySelector("#confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      alert("Registration successful!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "books.html";
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Registration error:", error);
  }
});
