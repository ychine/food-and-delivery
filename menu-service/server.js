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
  },
  {
    "id": 21,
    "restaurantId": 1,
    "name": "Jolly Spaghetti",
    "price": 85
  },
  {
    "id": 22,
    "restaurantId": 1,
    "name": "Yumburger",
    "price": 45
  },
  {
    "id": 23,
    "restaurantId": 1,
    "name": "Burger Steak Meal",
    "price": 119
  },
  {
    "id": 24,
    "restaurantId": 1,
    "name": "Peach Mango Pie",
    "price": 48
  },
  {
    "id": 25,
    "restaurantId": 2,
    "name": "Big Mac",
    "price": 199
  },
  {
    "id": 26,
    "restaurantId": 2,
    "name": "Chicken McDo Meal",
    "price": 159
  },
  {
    "id": 27,
    "restaurantId": 2,
    "name": "McSpaghetti",
    "price": 89
  },
  {
    "id": 28,
    "restaurantId": 2,
    "name": "Cheeseburger",
    "price": 79
  },
  {
    "id": 29,
    "restaurantId": 3,
    "name": "Pork Chao Fan",
    "price": 99
  },
  {
    "id": 30,
    "restaurantId": 3,
    "name": "Beef Chao Fan",
    "price": 119
  },
  {
    "id": 31,
    "restaurantId": 3,
    "name": "Chinese-Style Fried Chicken",
    "price": 169
  },
  {
    "id": 32,
    "restaurantId": 3,
    "name": "Pork Siomai",
    "price": 65
  },
  {
    "id": 33,
    "restaurantId": 4,
    "name": "Pork Sisig",
    "price": 139
  },
  {
    "id": 34,
    "restaurantId": 4,
    "name": "Pork BBQ",
    "price": 149
  },
  {
    "id": 35,
    "restaurantId": 4,
    "name": "Palabok",
    "price": 99
  },
  {
    "id": 36,
    "restaurantId": 4,
    "name": "Halo-Halo",
    "price": 79
  },
  {
    "id": 37,
    "restaurantId": 5,
    "name": "Lasagna Supreme",
    "price": 149
  },
  {
    "id": 38,
    "restaurantId": 5,
    "name": "All-In Overload Pizza",
    "price": 399
  },
  {
    "id": 39,
    "restaurantId": 5,
    "name": "Bacon Overload Pizza",
    "price": 359
  },
  {
    "id": 40,
    "restaurantId": 5,
    "name": "Garlic Sticks",
    "price": 79
  },
  {
    "id": 41,
    "restaurantId": 6,
    "name": "Zinger Sandwich",
    "price": 165
  },
  {
    "id": 42,
    "restaurantId": 6,
    "name": "Famous Bowl",
    "price": 95
  },
  {
    "id": 43,
    "restaurantId": 6,
    "name": "Hot Shots",
    "price": 99
  },
  {
    "id": 44,
    "restaurantId": 6,
    "name": "Spaghetti",
    "price": 85
  },
  {
    "id": 45,
    "restaurantId": 7,
    "name": "Super Supreme Pizza",
    "price": 459
  },
  {
    "id": 46,
    "restaurantId": 7,
    "name": "Cheese Lovers Pizza",
    "price": 329
  },
  {
    "id": 47,
    "restaurantId": 7,
    "name": "Meat Lovers Pizza",
    "price": 449
  },
  {
    "id": 48,
    "restaurantId": 7,
    "name": "Spaghetti Bolognese",
    "price": 169
  },
  {
    "id": 49,
    "restaurantId": 8,
    "name": "Shakey's Special Pizza",
    "price": 429
  },
  {
    "id": 50,
    "restaurantId": 8,
    "name": "Mojos",
    "price": 159
  },
  {
    "id": 51,
    "restaurantId": 8,
    "name": "Chicken Basket",
    "price": 399
  },
  {
    "id": 52,
    "restaurantId": 8,
    "name": "Carbonara",
    "price": 229
  },
  {
    "id": 53,
    "restaurantId": 9,
    "name": "Whopper Jr.",
    "price": 119
  },
  {
    "id": 54,
    "restaurantId": 9,
    "name": "Flame-Grilled Cheeseburger",
    "price": 89
  },
  {
    "id": 55,
    "restaurantId": 9,
    "name": "Chicken King",
    "price": 199
  },
  {
    "id": 56,
    "restaurantId": 9,
    "name": "Onion Rings",
    "price": 79
  },
  {
    "id": 57,
    "restaurantId": 10,
    "name": "Dave's Single",
    "price": 199
  },
  {
    "id": 58,
    "restaurantId": 10,
    "name": "Spicy Chicken Sandwich",
    "price": 179
  },
  {
    "id": 59,
    "restaurantId": 10,
    "name": "Chili Con Carne",
    "price": 99
  },
  {
    "id": 60,
    "restaurantId": 10,
    "name": "Baked Potato with Cheese",
    "price": 89
  },
  {
    "id": 61,
    "restaurantId": 11,
    "name": "Fried Chicken Meal",
    "price": 169
  },
  {
    "id": 62,
    "restaurantId": 11,
    "name": "Cajun Fries",
    "price": 85
  },
  {
    "id": 63,
    "restaurantId": 11,
    "name": "Cajun Chicken Burger",
    "price": 149
  },
  {
    "id": 64,
    "restaurantId": 11,
    "name": "Biscuits",
    "price": 59
  },
  {
    "id": 65,
    "restaurantId": 12,
    "name": "Spicy Chicken",
    "price": 189
  },
  {
    "id": 66,
    "restaurantId": 12,
    "name": "Bibimbowl",
    "price": 179
  },
  {
    "id": 67,
    "restaurantId": 12,
    "name": "Japchae",
    "price": 149
  },
  {
    "id": 68,
    "restaurantId": 12,
    "name": "Fish and Chips",
    "price": 189
  },
  {
    "id": 69,
    "restaurantId": 13,
    "name": "Prawn Tempura",
    "price": 239
  },
  {
    "id": 70,
    "restaurantId": 13,
    "name": "Pork Tonkatsu",
    "price": 199
  },
  {
    "id": 71,
    "restaurantId": 13,
    "name": "Chicken Teriyaki",
    "price": 209
  },
  {
    "id": 72,
    "restaurantId": 13,
    "name": "Beef Ramen",
    "price": 249
  },
  {
    "id": 73,
    "restaurantId": 14,
    "name": "Fresh Lumpia",
    "price": 99
  },
  {
    "id": 74,
    "restaurantId": 14,
    "name": "Pancit Malabon",
    "price": 119
  },
  {
    "id": 75,
    "restaurantId": 14,
    "name": "Pork BBQ",
    "price": 139
  },
  {
    "id": 76,
    "restaurantId": 14,
    "name": "Polvoron",
    "price": 65
  },
  {
    "id": 77,
    "restaurantId": 15,
    "name": "Butter Mamon",
    "price": 35
  },
  {
    "id": 78,
    "restaurantId": 15,
    "name": "Cheesy Ensaimada",
    "price": 45
  },
  {
    "id": 79,
    "restaurantId": 15,
    "name": "Black Forest Cake Slice",
    "price": 125
  },
  {
    "id": 80,
    "restaurantId": 15,
    "name": "Chocolate Mousse Cake Slice",
    "price": 115
  },
  {
    "id": 81,
    "restaurantId": 16,
    "name": "Classic Burger",
    "price": 225
  },
  {
    "id": 82,
    "restaurantId": 16,
    "name": "Freedom Fries",
    "price": 125
  },
  {
    "id": 83,
    "restaurantId": 16,
    "name": "Chicken Quesadilla",
    "price": 245
  },
  {
    "id": 84,
    "restaurantId": 16,
    "name": "Steak Soft Tacos",
    "price": 265
  },
  {
    "id": 85,
    "restaurantId": 17,
    "name": "Dear Darla Pizza",
    "price": 459
  },
  {
    "id": 86,
    "restaurantId": 17,
    "name": "Manhattan Meatlovers Pizza",
    "price": 499
  },
  {
    "id": 87,
    "restaurantId": 17,
    "name": "Charlie Chan Pasta",
    "price": 299
  },
  {
    "id": 88,
    "restaurantId": 17,
    "name": "Chicken Alfredo Pasta",
    "price": 299
  },
  {
    "id": 89,
    "restaurantId": 18,
    "name": "Yang Chow Fried Rice",
    "price": 229
  },
  {
    "id": 90,
    "restaurantId": 18,
    "name": "Nanking Beef",
    "price": 329
  },
  {
    "id": 91,
    "restaurantId": 18,
    "name": "Wanton Noodle Soup",
    "price": 189
  },
  {
    "id": 92,
    "restaurantId": 18,
    "name": "Lechon Macau",
    "price": 349
  },
  {
    "id": 93,
    "restaurantId": 19,
    "name": "Beijing Beef",
    "price": 245
  },
  {
    "id": 94,
    "restaurantId": 19,
    "name": "Kung Pao Chicken",
    "price": 245
  },
  {
    "id": 95,
    "restaurantId": 19,
    "name": "Broccoli Beef",
    "price": 245
  },
  {
    "id": 96,
    "restaurantId": 19,
    "name": "Chow Mein",
    "price": 125
  },
  {
    "id": 97,
    "restaurantId": 20,
    "name": "BBQ Ribs",
    "price": 399
  },
  {
    "id": 98,
    "restaurantId": 20,
    "name": "Mac and Cheese",
    "price": 95
  },
  {
    "id": 99,
    "restaurantId": 20,
    "name": "Corn Muffin",
    "price": 45
  },
  {
    "id": 100,
    "restaurantId": 20,
    "name": "Chicken Quesadilla",
    "price": 199
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
