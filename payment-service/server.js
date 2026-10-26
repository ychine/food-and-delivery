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

const payments = [
  { id: 1, orderId: 1, amount: 234, status: "PAID" },
  { id: 2, orderId: 2, amount: 498, status: "PENDING" },
  { id: 3, orderId: 3, amount: 175, status: "FAILED" }
];

crud(app, "/payments", payments, async body => {
  const orderId = positiveId(body.orderId, "orderId");
  await remote("ORDER", `/orders/${orderId}`);

  const amount = (() => {
    if (typeof body.amount !== "number" || !Number.isFinite(body.amount) || body.amount <= 0) {
      fail(400, "amount must be a positive number");
    }
    return body.amount;
  })();

  return {
    orderId,
    amount,
    status: statusValue(body.status || "PENDING", ["PENDING", "PAID", "FAILED"])
  };
});

start(app, 3005, "Payment Service");

