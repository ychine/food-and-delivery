const express = require("express");

function fail(status, message) {
  const error = new Error(message);
  error.status = status;
  throw error;
}

function text(value, name) {
  if (typeof value !== "string" || !value.trim()) {
    fail(400, `${name} is required`);
  }

  return value.trim();
}

function positiveId(value, name) {
  if (!Number.isSafeInteger(value) || value < 1) {
    fail(400, `${name} must be a positive integer`);
  }

  return value;
}

function statusValue(value, allowed) {
  if (!allowed.includes(value)) {
    fail(400, "Invalid status");
  }

  return value;
}

async function remote(service, path) {
  const ports = {
    CUSTOMER: 3003,
    RESTAURANT: 3001,
    MENU: 3002
  };

  const baseUrl =
    process.env[`${service}_SERVICE_URL`] ||
    `http://localhost:${ports[service]}`;

  let response;

  try {
    response = await fetch(`${baseUrl}${path}`, {
      signal: AbortSignal.timeout(5000)
    });
  } catch {
    fail(503, `${service} service unavailable`);
  }

  if (response.status === 404) {
    fail(422, `${service} record does not exist`);
  }

  if (!response.ok) {
    fail(503, `${service} service returned an error`);
  }

  return response.json();
}

function createApp() {
  const app = express();
  app.use(express.json({ limit: "64kb" }));
  return app;
}

function crud(app, path, records, validate) {
  let nextId = Math.max(0, ...records.map(record => record.id)) + 1;

  app.get(path, (req, res) => {
    res.json(records);
  });

  app.get(`${path}/:id`, (req, res) => {
    const record = records.find(
      record => record.id === Number(req.params.id)
    );

    if (!record) {
      fail(404, "Record not found");
    }

    res.json(record);
  });

  app.post(path, async (req, res) => {
    const data = await validate(req.body);
    const record = { id: nextId++, ...data };

    records.push(record);

    res.status(201).json(record);
  });

  app.put(`${path}/:id`, async (req, res) => {
    const record = records.find(
      record => record.id === Number(req.params.id)
    );

    if (!record) {
      fail(404, "Record not found");
    }

    const data = await validate({
      ...record,
      ...req.body
    });

    Object.assign(record, data);

    res.json(record);
  });

  app.delete(`${path}/:id`, (req, res) => {
    const index = records.findIndex(
      record => record.id === Number(req.params.id)
    );

    if (index === -1) {
      fail(404, "Record not found");
    }

    records.splice(index, 1);

    res.status(204).end();
  });
}

function start(app, port, name) {
  app.get("/", (req, res) => {
    res.json({
      service: name,
      status: "Running"
    });
  });

  app.use((error, req, res, next) => {
    const status = error.status || 500;

    res.status(status).json({
      message:
        status === 500
          ? "Internal server error"
          : error.message
    });
  });

  app.listen(process.env.PORT || port, "0.0.0.0", () => {
    console.log(`${name} running on port ${port}`);
  });
}

module.exports = {
  createApp,
  crud,
  start,
  fail,
  text,
  positiveId,
  statusValue,
  remote
};