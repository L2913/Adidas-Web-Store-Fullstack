const ordersContainer = document.getElementById("ordersContainer");

const username = localStorage.getItem("username");

async function displayOrders() {
  if (!username) {
    alert("Please login first.");
    window.location.href = "login.html";
    return;
  }

  try {
    const response = await fetch(
      `https://adidas-web-store-backend.onrender.com/api/orders?username=${username}`
    );

    const orders = await response.json();

    ordersContainer.innerHTML = "";

    if (orders.length === 0) {
      ordersContainer.innerHTML =
        "<p class='empty-cart'>No orders yet.</p>";
      return;
    }

    orders.forEach((order, index) => {
      let itemsHTML = "";

      order.items.forEach(item => {
        itemsHTML += `
          <p>
            ${item.name} x ${item.quantity}
            - ₱${(Number(item.price) * Number(item.quantity)).toLocaleString()}
          </p>
        `;
      });

      ordersContainer.innerHTML += `
        <div class="order-card">
          <h3>Order #${index + 1}</h3>
          <p>User: ${order.username}</p>
          <p>Date: ${new Date(order.createdAt).toLocaleString()}</p>
          ${itemsHTML}
          <h4>Total: ₱${Number(order.total).toLocaleString()}</h4>
        </div>
      `;
    });
  } catch (error) {
    console.log(error);
    ordersContainer.innerHTML =
      "<p>Failed to load orders. Backend may be waking up.</p>";
  }
}

displayOrders();