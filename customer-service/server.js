const {
  createApp,
  crud,
  start,
  text
} = require("./common");

const app = createApp();

const customers = [
  {
    id: 1,
    name: "Miguel Santos",
    email: "miguel.santos@example.com",
    address: "Barangay San Isidro, Quezon City"
  },
  {
    id: 2,
    name: "Andrea Reyes",
    email: "andrea.reyes@example.com",
    address: "Barangay Malinis, Pasig City"
  },
  {
    id: 3,
    name: "Joshua Cruz",
    email: "joshua.cruz@example.com",
    address: "Barangay Mabuhay, Makati City"
  },
  {
    id: 4,
    name: "Patricia Mendoza",
    email: "patricia.mendoza@example.com",
    address: "Barangay Masagana, Marikina City"
  },
  {
    id: 5,
    name: "Carlo Garcia",
    email: "carlo.garcia@example.com",
    address: "Barangay Santo Niño, Taguig City"
  }
];

crud(app, "/customers", customers, async body => {
  return {
    name: text(body.name, "name"),
    email: text(body.email, "email"),
    address: text(body.address, "address")
  };
});

start(app, 3003, "Customer Service");