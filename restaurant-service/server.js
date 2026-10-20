const express = require("express");
const app = express();
app.use(express.json());

const restaurants = [
  {
    "id": 1,
    "name": "Jollibee",
    "cuisine": "Fast Food",
    "address": "101 Sampaguita Street, Barangay San Miguel, Pasig City",
    "status": "OPEN"
  },
  {
    "id": 2,
    "name": "McDonald’s",
    "cuisine": "Fast Food",
    "address": "24 Narra Street, Barangay Kapitolyo, Pasig City",
    "status": "OPEN"
  },
  {
    "id": 3,
    "name": "Chowking",
    "cuisine": "Fast Food",
    "address": "58 Mabini Street, Barangay Caniogan, Pasig City",
    "status": "OPEN"
  },
  {
    "id": 4,
    "name": "Mang Inasal",
    "cuisine": "Fast Food",
    "address": "76 Acacia Street, Barangay Bagong Ilog, Pasig City",
    "status": "OPEN"
  },
  {
    "id": 5,
    "name": "Greenwich",
    "cuisine": "Fast Food",
    "address": "12 Rosal Street, Barangay Rosario, Pasig City",
    "status": "OPEN"
  },
  {
    "id": 6,
    "name": "KFC",
    "cuisine": "Fast Food",
    "address": "39 Molave Street, Barangay Maybunga, Pasig City",
    "status": "OPEN"
  },
  {
    "id": 7,
    "name": "Pizza Hut",
    "cuisine": "Restaurant",
    "address": "85 Ilang-Ilang Street, Barangay San Antonio, Pasig City",
    "status": "OPEN"
  },
  {
    "id": 8,
    "name": "Shakey’s",
    "cuisine": "Restaurant",
    "address": "17 Yakal Street, Barangay Ugong, Pasig City",
    "status": "OPEN"
  },
  {
    "id": 9,
    "name": "Burger King",
    "cuisine": "Restaurant",
    "address": "63 Gumamela Street, Barangay Oranbo, Pasig City",
    "status": "OPEN"
  },
  {
    "id": 10,
    "name": "Wendy’s",
    "cuisine": "Restaurant",
    "address": "28 Kamagong Street, Barangay Pineda, Pasig City",
    "status": "OPEN"
  },
  {
    "id": 11,
    "name": "Popeyes",
    "cuisine": "Restaurant",
    "address": "94 Duhat Street, Barangay Palatiw, Pasig City",
    "status": "OPEN"
  },
  {
    "id": 12,
    "name": "Bonchon",
    "cuisine": "Restaurant",
    "address": "46 Santan Street, Barangay Malinao, Pasig City",
    "status": "OPEN"
  },
  {
    "id": 13,
    "name": "Tokyo Tokyo",
    "cuisine": "Restaurant",
    "address": "31 Mahogany Street, Barangay San Nicolas, Pasig City",
    "status": "OPEN"
  },
  {
    "id": 14,
    "name": "Goldilocks",
    "cuisine": "Restaurant",
    "address": "72 Jasmine Street, Barangay Bambang, Pasig City",
    "status": "OPEN"
  },
  {
    "id": 15,
    "name": "Red Ribbon",
    "cuisine": "Restaurant",
    "address": "19 Balete Street, Barangay Kalawaan, Pasig City",
    "status": "OPEN"
  },
  {
    "id": 16,
    "name": "Army Navy",
    "cuisine": "Restaurant",
    "address": "54 Dahlia Street, Barangay Pinagbuhatan, Pasig City",
    "status": "OPEN"
  },
  {
    "id": 17,
    "name": "Yellow Cab",
    "cuisine": "Restaurant",
    "address": "88 Ipil Street, Barangay Sagad, Pasig City",
    "status": "OPEN"
  },
  {
    "id": 18,
    "name": "North Park",
    "cuisine": "Restaurant",
    "address": "35 Orchid Street, Barangay Santa Cruz, Pasig City",
    "status": "OPEN"
  },
  {
    "id": 19,
    "name": "Panda Express",
    "cuisine": "Restaurant",
    "address": "67 Talisay Street, Barangay Manggahan, Pasig City",
    "status": "OPEN"
  },
  {
    "id": 20,
    "name": "Kenny Rogers Roasters",
    "cuisine": "Restaurant",
    "address": "22 Camia Street, Barangay Santolan, Pasig City",
    "status": "OPEN"
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
  const fields = ["name","cuisine","address"];
  for (const field of fields) {
    if (field === "restaurantId") {
      if (!Number.isSafeInteger(body[field]) || body[field] < 1) return "restaurantId must be a positive integer";
    } else if (field === "price") {
      if (typeof body[field] !== "number" || !Number.isFinite(body[field]) || body[field] < 0) return "price must be a non-negative number";
    } else if (typeof body[field] !== "string" || !body[field].trim()) {
      return field + " must be a non-empty string";
    }
  }
  if (!["OPEN", "CLOSED"].includes(body.status)) return "status must be OPEN or CLOSED";
  return null;
}
function payloadFields(body) {
  return Object.fromEntries(["name","cuisine","address","status"].map(field => [field, typeof body[field] === "string" ? body[field].trim() : body[field]]));
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
