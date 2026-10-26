const {
  createApp,
  crud,
  start,
  positiveId,
  text,
  statusValue,
  remote
} = require("./common");

const app = createApp();

const deliveries = [
  { id: 1, orderId: 1, riderName: "Marco Dela Cruz", status: "DELIVERED" },
  { id: 2, orderId: 2, riderName: "Liza Santos", status: "ASSIGNED" },
  { id: 3, orderId: 3, riderName: "Paolo Reyes", status: "PICKED_UP" }
];

crud(app, "/deliveries", deliveries, async body => {
  const orderId = positiveId(body.orderId, "orderId");
  await remote("ORDER", `/orders/${orderId}`);

  return {
    orderId,
    riderName: text(body.riderName, "riderName"),
    status: statusValue(body.status || "ASSIGNED", ["ASSIGNED", "PICKED_UP", "DELIVERED"])
  };
});

start(app, 3006, "Delivery Service");

