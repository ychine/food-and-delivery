const express = require("express");
const app = express();
app.use(express.json());

const menu = [
  {
    "id": 1,
    "restaurantId": 1,
    "name": "Chickenjoy Meal",
    "price": 149
  },
  {
    "id": 2,
    "restaurantId": 2,
    "name": "Burger McDo Meal",
    "price": 129
  },
  {
    "id": 3,
    "restaurantId": 3,
    "name": "Chao Fan",
    "price": 115
  },
  {
    "id": 4,
    "restaurantId": 4,
    "name": "Chicken Inasal",
    "price": 175
  },
  {
    "id": 5,
    "restaurantId": 5,
    "name": "Hawaiian Pizza",
    "price": 299
  },
  {
    "id": 6,
    "restaurantId": 6,
    "name": "Original Recipe Chicken",
    "price": 165
  },
  {
    "id": 7,
    "restaurantId": 7,
    "name": "Pepperoni Pizza",
    "price": 349
  },
  {
    "id": 8,
    "restaurantId": 8,
    "name": "Manager’s Choice Pizza",
    "price": 399
  },
  {
    "id": 9,
    "restaurantId": 9,
    "name": "Whopper",
    "price": 219
  },
  {
    "id": 10,
    "restaurantId": 10,
    "name": "Baconator",
    "price": 249
  },
  {
    "id": 11,
    "restaurantId": 11,
    "name": "Chicken Sandwich",
    "price": 199
  },
  {
    "id": 12,
    "restaurantId": 12,
    "name": "Soy Garlic Chicken",
    "price": 189
  },
  {
    "id": 13,
    "restaurantId": 13,
    "name": "Beef Misono",
    "price": 229
  },
  {
    "id": 14,
    "restaurantId": 14,
    "name": "Pork Dinuguan",
    "price": 145
  },
  {
    "id": 15,
    "restaurantId": 15,
    "name": "Chicken Empanada",
    "price": 75
  },
  {
    "id": 16,
    "restaurantId": 16,
    "name": "Burrito",
    "price": 285
  },
  {
    "id": 17,
    "restaurantId": 17,
    "name": "New York’s Finest Pizza",
    "price": 499
  },
  {
    "id": 18,
    "restaurantId": 18,
    "name": "Sweet and Sour Pork",
    "price": 259
  },
  {
    "id": 19,
    "restaurantId": 19,
    "name": "Orange Chicken",
    "price": 245
  },
  {
    "id": 20,
    "restaurantId": 20,
    "name": "Roasted Chicken",
    "price": 299
  }
];

app.get("/", (req, res) => res.json({ service: "Menu item Service", status: "Running" }));
app.get("/menu", (req, res) => res.json(menu));
app.get("/menu/:id", (req, res) => {
  const item = menu.find(x => x.id === Number(req.params.id));
  if (!item) return res.status(404).json({ message: "Menu item not found" });
  res.json(item);
});
app.get("/menu/restaurants/:restaurantId/menu", (req, res) => res.json(menu.filter(x => x.restaurantId === Number(req.params.restaurantId))));
app.get("/menu/restaurant/:restaurantId", (req, res) => {
    const restaurantId = parseInt(req.params.restaurantId);

    const restaurantMenu = menu.filter(
        item => item.restaurantId === restaurantId
    );

    if (restaurantMenu.length === 0) {
        return res.status(404).json({
            message: "No menu items found for this restaurant"
        });
    }

    res.json(restaurantMenu);
});

app.listen(3002, () => console.log("Menu item Service running on port 3002"));
