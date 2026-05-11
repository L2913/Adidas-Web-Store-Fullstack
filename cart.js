const ORDERS_URL = "https://adidas-web-store-backend.onrender.com/api/orders";

const cartItemsContainer = document.getElementById("cartItems");
const totalPriceText = document.getElementById("totalPrice");
const checkoutBtn = document.querySelector(".checkout-btn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function displayCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      "<p class='empty-cart'>Your cart is empty.</p>";
    totalPriceText.textContent = "Total: ₱0";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = Number(item.price) * Number(item.quantity);
    total += itemTotal;

    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">

        <div>
          <h3>${item.name}</h3>
          <p>Price: ₱${Number(item.price).toLocaleString()}</p>

          <div class="quantity-box">
            <button onclick="decreaseQuantity(${index})">-</button>
            <span>${item.quantity}</span>
            <button onclick="increaseQuantity(${index})">+</button>
          </div>

          <p>Subtotal: ₱${itemTotal.toLocaleString()}</p>
        </div>

        <button onclick="removeItem(${index})">REMOVE</button>
      </div>
    `;
  });

  totalPriceText.textContent = `Total: ₱${total.toLocaleString()}`;
}

function increaseQuantity(index) {
  cart[index].quantity += 1;
  saveCart();
  displayCart();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }

  saveCart();
  displayCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  displayCart();
}

async function checkout() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first before checkout.");
    window.location.href = "login.html";
    return;
  }

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const total = cart.reduce((sum, item) => {
    return sum + Number(item.price) * Number(item.quantity);
  }, 0);

  const orderData = {
    username: localStorage.getItem("username"),
    items: cart,
    total: total
  };

  try {
    const response = await fetch(ORDERS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.removeItem("cart");
      alert("Checkout successful!");
      window.location.href = "orders.html";
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
    alert("Checkout failed. Backend may be waking up. Try again.");
  }
}

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", checkout);
}

window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.removeItem = removeItem;

displayCart();