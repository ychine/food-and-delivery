const express = require("express");
const app = express();
app.use(express.json());

const restaurants = [
  {
    "id": 1,
    "name": "Jollibee",
    "cuisine": "Fast Food",
    "location": "Metro Manila"
  },
  {
    "id": 2,
    "name": "McDonald’s",
    "cuisine": "Fast Food",
    "location": "Metro Manila"
  },
  {
    "id": 3,
    "name": "Chowking",
    "cuisine": "Fast Food",
    "location": "Metro Manila"
  },
  {
    "id": 4,
    "name": "Mang Inasal",
    "cuisine": "Fast Food",
    "location": "Metro Manila"
  },
  {
    "id": 5,
    "name": "Greenwich",
    "cuisine": "Fast Food",
    "location": "Metro Manila"
  },
  {
    "id": 6,
    "name": "KFC",
    "cuisine": "Fast Food",
    "location": "Metro Manila"
  },
  {
    "id": 7,
    "name": "Pizza Hut",
    "cuisine": "Restaurant",
    "location": "Metro Manila"
  },
  {
    "id": 8,
    "name": "Shakey’s",
    "cuisine": "Restaurant",
    "location": "Metro Manila"
  },
  {
    "id": 9,
    "name": "Burger King",
    "cuisine": "Restaurant",
    "location": "Metro Manila"
  },
  {
    "id": 10,
    "name": "Wendy’s",
    "cuisine": "Restaurant",
    "location": "Metro Manila"
  },
  {
    "id": 11,
    "name": "Popeyes",
    "cuisine": "Restaurant",
    "location": "Metro Manila"
  },
  {
    "id": 12,
    "name": "Bonchon",
    "cuisine": "Restaurant",
    "location": "Metro Manila"
  },
  {
    "id": 13,
    "name": "Tokyo Tokyo",
    "cuisine": "Restaurant",
    "location": "Metro Manila"
  },
  {
    "id": 14,
    "name": "Goldilocks",
    "cuisine": "Restaurant",
    "location": "Metro Manila"
  },
  {
    "id": 15,
    "name": "Red Ribbon",
    "cuisine": "Restaurant",
    "location": "Metro Manila"
  },
  {
    "id": 16,
    "name": "Army Navy",
    "cuisine": "Restaurant",
    "location": "Metro Manila"
  },
  {
    "id": 17,
    "name": "Yellow Cab",
    "cuisine": "Restaurant",
    "location": "Metro Manila"
  },
  {
    "id": 18,
    "name": "North Park",
    "cuisine": "Restaurant",
    "location": "Metro Manila"
  },
  {
    "id": 19,
    "name": "Panda Express",
    "cuisine": "Restaurant",
    "location": "Metro Manila"
  },
  {
    "id": 20,
    "name": "Kenny Rogers Roasters",
    "cuisine": "Restaurant",
    "location": "Metro Manila"
  }
];

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
    const response = await fetch(`http://menu-service:3002/restaurants/${restaurant.id}/menu`);
    if (!response.ok) throw new Error("Menu Service returned an error");
    res.json({ restaurant, menu: await response.json() });
  } catch (error) {
    res.status(503).json({ message: "Unable to communicate with Menu Service" });
  }
});
app.listen(3001, () => console.log("Restaurant Service running on port 3001"));
