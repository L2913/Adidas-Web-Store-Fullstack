const ordersContainer =
  document.getElementById("ordersContainer");

async function displayOrders() {

  try {

    const response = await fetch(
      `http://localhost:5000/api/orders?username=${localStorage.getItem("username")}`
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
            ${item.name}
            x ${item.quantity}
            - ₱${(
              item.price * item.quantity
            ).toLocaleString()}
          </p>
        `;
      });

      ordersContainer.innerHTML += `
        <div class="order-card">

          <h3>
            Order #${index + 1}
          </h3>

          <p>
            User:
            ${order.username}
          </p>

          <p>
            Date:
            ${new Date(
              order.createdAt
            ).toLocaleString()}
          </p>

          ${itemsHTML}

          <h4>
            Total:
            ₱${order.total.toLocaleString()}
          </h4>

        </div>
      `;
    });

  } catch (error) {

    console.log(error);

    ordersContainer.innerHTML =
      "<p>Failed to load orders.</p>";
  }
}

displayOrders();