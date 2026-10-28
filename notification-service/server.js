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
const notifications = [];

crud(app, "/notifications", notifications, async body => {
  const customerId = positiveId(
    body.customerId,
    "customerId"
  );

  await remote(
    "CUSTOMER",
    `/customers/${customerId}`
  );

  return {
    customerId,
    message: text(body.message, "message"),
    type: statusValue(
      body.type || "ORDER_CONFIRMATION",
      [
        "ORDER_CONFIRMATION",
        "PAYMENT_UPDATE",
        "DELIVERY_UPDATE"
      ]
    ),
    status: statusValue(
      body.status || "SENT",
      ["PENDING", "SENT", "FAILED"]
    )
  };
});

start(app, 3007, "Notification Service");