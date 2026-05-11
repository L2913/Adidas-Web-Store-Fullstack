const API_URL = "https://adidas-web-store-backend.onrender.com/api/products";
const productContainer = document.getElementById("productContainer");
const userDisplay = document.getElementById("userDisplay");
const logoutBtn = document.getElementById("logoutBtn");

let allProducts = [];

async function displayProducts() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Backend API error");
    }

    allProducts = await response.json();

    productContainer.innerHTML = "";

    allProducts.forEach((product, index) => {
      productContainer.innerHTML += `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>₱${Number(product.price).toLocaleString()}</p>
          <button onclick="showDetails(${index})">DETAILS</button>
          <button onclick="addToCart(${index})">ADD TO CART</button>
        </div>
      `;
    });
  } catch (error) {
    console.log("Product loading error:", error);
    productContainer.innerHTML = "<p>Failed to load products. Please check backend.</p>";
  }
}

function addToCart(index) {
  const product = allProducts[index];

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find(item => item._id === product._id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}

function showDetails(index) {
  const product = allProducts[index];
  alert(`${product.name}\n\n${product.description}`);
}

function loadUser() {
  const username = localStorage.getItem("username");

  if (userDisplay) {
    userDisplay.textContent = username ? `Hi, ${username}` : "Guest";
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("cart");

      alert("Logged out successfully.");
      window.location.href = "login.html";
    });
  }
}

displayProducts();
loadUser();