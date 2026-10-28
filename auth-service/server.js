const {
  createApp,
  start,
  fail,
  text,
  positiveId,
  remote
} = require("./common");

const {
  randomBytes,
  scrypt,
  timingSafeEqual
} = require("node:crypto");

const { promisify } = require("node:util");

const hashPassword = promisify(scrypt);

const app = createApp();

const users = [];
const sessions = new Map();

let nextId = 1;

function credentials(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    fail(400, "A JSON object is required");
  }

  const email = text(body.email, "email").toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fail(400, "A valid email is required");
  }

  const password = body.password;

  if (
    typeof password !== "string" ||
    password.length < 8 ||
    password.length > 128
  ) {
    fail(400, "Password must contain 8 to 128 characters");
  }

  return { email, password };
}

function publicUser(user) {
  return {
    id: user.id,
    customerId: user.customerId,
    email: user.email,
    role: user.role
  };
}

app.post("/register", async (req, res) => {
  const { email, password } = credentials(req.body);

  const customerId = positiveId(
    req.body.customerId,
    "customerId"
  );

  await remote(
    "CUSTOMER",
    `/customers/${customerId}`
  );

  const salt = randomBytes(16).toString("hex");

  const passwordHash = await hashPassword(
    password,
    salt,
    64
  );

  const duplicate = users.some(user =>
    user.email === email ||
    user.customerId === customerId
  );

  if (duplicate) {
    fail(409, "Email or customer already registered");
  }

  const user = {
    id: nextId++,
    customerId,
    email,
    salt,
    passwordHash,
    role: "CUSTOMER"
  };

  users.push(user);

  res.status(201).json(publicUser(user));
});

app.post("/login", async (req, res) => {
  const { email, password } = credentials(req.body);

  const user = users.find(user => user.email === email);

  if (!user) {
    fail(401, "Invalid credentials");
  }

  const suppliedHash = await hashPassword(
    password,
    user.salt,
    64
  );

  if (!timingSafeEqual(suppliedHash, user.passwordHash)) {
    fail(401, "Invalid credentials");
  }

  const token = randomBytes(32).toString("hex");

  const expiresAt = Date.now() + 60 * 60 * 1000;

  for (const [key, session] of sessions) {
    if (session.expiresAt <= Date.now()) {
      sessions.delete(key);
    }
  }

  sessions.set(token, {
    userId: user.id,
    expiresAt
  });

  res.json({
    token,
    expiresAt,
    user: publicUser(user)
  });
});

app.get("/users/:id", (req, res) => {
  const authorization = req.get("authorization") || "";

  const match = /^Bearer (.+)$/.exec(authorization);

  const session = match
    ? sessions.get(match[1])
    : undefined;

  if (!session || session.expiresAt <= Date.now()) {
    fail(401, "Valid login required");
  }

  const user = users.find(
    user => user.id === session.userId
  );

  if (!user) {
    fail(401, "Valid login required");
  }

  if (
    user.role !== "CUSTOMER" ||
    user.id !== Number(req.params.id)
  ) {
    fail(403, "Customers may view only their own account");
  }

  res.json(publicUser(user));
});

start(app, 3008, "Authentication Service");