const AUTH_URL = "https://adidas-web-store-backend.onrender.com/api/auth";

async function registerUser() {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const response = await fetch(`${AUTH_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Registration successful. Please login.");
      window.location.href = "login.html";
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
    alert("Registration failed. Please check your backend.");
  }
}

async function loginUser() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const response = await fetch(`${AUTH_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);

      alert("Login successful.");
      window.location.href = "index.html";
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
    alert("Login failed. Please check your backend.");
  }
}