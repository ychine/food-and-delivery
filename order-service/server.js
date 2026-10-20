const {
  createApp,
  crud,
  start,
  fail,
  positiveId,
  statusValue,
  remote
} = require("./common");

const app = createApp();
const orders = [];

crud(app, "/orders", orders, async body => {
  const customerId = positiveId(body.customerId, "customerId");
  const restaurantId = positiveId(body.restaurantId, "restaurantId");

  await remote("CUSTOMER", `/customers/${customerId}`);

  const restaurant = await remote(
    "RESTAURANT",
    `/restaurants/${restaurantId}`
  );

  if (restaurant.isOpen === false || restaurant.status === "CLOSED") {
    fail(422, "Restaurant is closed");
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    fail(400, "items must be a nonempty array");
  }

  const items = await Promise.all(
    body.items.map(async entry => {
      const menuItemId = positiveId(entry.menuItemId, "menuItemId");
      const quantity = positiveId(entry.quantity, "quantity");

      const menuItem = await remote("MENU", `/menu/${menuItemId}`);

      if (menuItem.restaurantId !== restaurantId) {
        fail(422, "Menu item belongs to another restaurant");
      }

      if (menuItem.available === false) {
        fail(422, "Menu item is unavailable");
      }

      return {
        menuItemId,
        name: menuItem.name,
        quantity,
        unitPrice: menuItem.price
      };
    })
  );

  const totalAmount =
    Math.round(
      items.reduce(
        (total, item) => total + item.quantity * item.unitPrice,
        0
      ) * 100
    ) / 100;

  return {
    customerId,
    restaurantId,
    items,
    totalAmount,
    status: statusValue(body.status || "PLACED", [
      "PLACED",
      "CONFIRMED",
      "CANCELLED",
      "COMPLETED"
    ])
  };
});

start(app, 3004, "Order Service");