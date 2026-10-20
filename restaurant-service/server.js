const express = require("express");
const app = express();
app.use(express.json());

const restaurants = [
  {
    "id": 1,
    "name": "Jollibee",
    "address": "100 Jollibee Street, Metro Manila",
    "operatingStatus": "Open"
  },
  {
    "id": 2,
    "name": "McDonald’s",
    "address": "200 McDonalds Street, Metro Manila",
    "operatingStatus": "Open"
  },
  {
    "id": 3,
    "name": "Chowking",
    "address": "300 Chowking Street, Metro Manila",
    "operatingStatus": "Open"
  },
  {
    "id": 4,
    "name": "Mang Inasal",
    "address": "400 MangInasal Street, Metro Manila",
    "operatingStatus": "Open"
  },
  {
    "id": 5,
    "name": "Greenwich",
    "address": "500 Greenwich Street, Metro Manila",
    "operatingStatus": "Open"
  },
  {
    "id": 6,
    "name": "KFC",
    "address": "600 KFC Street, Metro Manila",
    "operatingStatus": "Open"
  },
  {
    "id": 7,
    "name": "Pizza Hut",
    "address": "700 PizzaHut Street, Metro Manila",
    "operatingStatus": "Open"
  },
  {
    "id": 8,
    "name": "Shakey’s",
    "address": "800 Shakeys Street, Metro Manila",
    "operatingStatus": "Open"
  },
  {
    "id": 9,
    "name": "Burger King",
    "address": "900 BurgerKing Street, Metro Manila",
    "operatingStatus": "Open"
  },
  {
    "id": 10,
    "name": "Wendy’s",
    "address": "1000 Wendys Street, Metro Manila",
    "operatingStatus": "Open"
  },
  {
    "id": 11,
    "name": "Popeyes",
    "address": "1100 Popeyes Street, Metro Manila",
    "operatingStatus": "Open"
  },
  {
    "id": 12,
    "name": "Bonchon",
    "address": "1200 Bonchon Street, Metro Manila",
    "operatingStatus": "Open"
  },
  {
    "id": 13,
    "name": "Tokyo Tokyo",
    "address": "1300 TokyoTokyo Street, Metro Manila",
    "operatingStatus": "Open"
  },
  {
    "id": 14,
    "name": "Goldilocks",
    "address": "1400 Goldilocks Street, Metro Manila",
    "operatingStatus": "Open"
  },
  {
    "id": 15,
    "name": "Red Ribbon",
    "address": "1500 RedRibbon Street, Metro Manila",
    "operatingStatus": "Open"
  },
  {
    "id": 16,
    "name": "Army Navy",
    "address": "1600 ArmyNavy Street, Metro Manila",
    "operatingStatus": "Open"
  },
  {
    "id": 17,
    "name": "Yellow Cab",
    "address": "1700 YellowCab Street, Metro Manila",
    "operatingStatus": "Open"
  },
  {
    "id": 18,
    "name": "North Park",
    "address": "1800 NorthPark Street, Metro Manila",
    "operatingStatus": "Open"
  },
  {
    "id": 19,
    "name": "Panda Express",
    "address": "1900 PandaExpress Street, Metro Manila",
    "operatingStatus": "Open"
  },
  {
    "id": 20,
    "name": "Kenny Rogers Roasters",
    "address": "2000 KennyRogersRoasters Street, Metro Manila",
    "operatingStatus": "Open"
  }
];

const menuServiceUrl = process.env.MENU_SERVICE_URL || "http://menu-service:3002";

app.get("/", (req, res) => res.json({ service: "Restaurant Service", status: "Running" }));
app.get("/restaurants", (req, res) => res.json(restaurants));
app.get("/restaurants/:id", (req, res) => {
  const item = restaurants.find(x => x.id === Number(req.params.id));
  if (!item) return res.status(404).json({ message: "Restaurant not found" });
  res.json(item);
});
app.get("/restaurants/:id/menu", async (req, res) => {
  const restaurant = restaurants.find(x => x.id === Number(req.params.id));
  if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
  try {
    const response = await fetch(`${menuServiceUrl}/menu/restaurants/${restaurant.id}/menu`);
    if (!response.ok) throw new Error("Menu Service returned an error");
    res.json({ restaurant, menu: await response.json() });
  } catch (error) {
    console.error("Menu Service request failed:", error);
    res.status(503).json({ message: "Unable to communicate with Menu Service" });
  }
});

let nextId = Math.max(0, ...restaurants.map(item => item.id)) + 1;
function validatePayload(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return "A JSON object is required";
  const fields = ["name", "address", "operatingStatus"];
  for (const field of fields) {
    if (field === "restaurantId") {
      if (!Number.isSafeInteger(body[field]) || body[field] < 1) return "restaurantId must be a positive integer";
    } else if (field === "operatingStatus") {
      if (!["Open", "Closed"].includes(body[field])) return "operatingStatus must be Open or Closed";
    } else if (field === "price") {
      if (typeof body[field] !== "number" || !Number.isFinite(body[field]) || body[field] < 0) return "price must be a non-negative number";
    } else if (typeof body[field] !== "string" || !body[field].trim()) {
      return field + " must be a non-empty string";
    }
  }
  return null;
}
function payloadFields(body) {
  return Object.fromEntries(["name", "address", "operatingStatus"].map(field => [field, typeof body[field] === "string" ? body[field].trim() : body[field]]));
}
app.post("/restaurants", (req, res) => {
  const error = validatePayload(req.body);
  if (error) return res.status(400).json({ message: error });
  const item = { id: nextId++, ...payloadFields(req.body) };
  restaurants.push(item);
  res.status(201).location("/restaurants/" + item.id).json(item);
});
app.put("/restaurants/:id", (req, res) => {
  const item = restaurants.find(item => item.id === Number(req.params.id));
  if (!item) return res.status(404).json({ message: "Restaurant not found" });
  const error = validatePayload(req.body);
  if (error) return res.status(400).json({ message: error });
  Object.assign(item, payloadFields(req.body));
  res.json(item);
});
app.delete("/restaurants/:id", (req, res) => {
  const index = restaurants.findIndex(item => item.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Restaurant not found" });
  restaurants.splice(index, 1);
  res.status(204).end();
});
app.use((error, req, res, next) => {
  if (error.type === "entity.parse.failed") return res.status(400).json({ message: "Invalid JSON body" });
  next(error);
});

app.listen(3001, () => console.log("Restaurant Service running on port 3001"));
