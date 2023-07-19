
const express = require("express");
const app = express();
const db = require("./db");
const bookRoutes = require("./routes/bookRoutes");
const errorController = require("./controllers/errorController");

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use("/books", bookRoutes);

// 404 Not Found route
app.use(errorController.handle404);

// Error handling middleware
app.use(errorController.handleErrors);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


// Uncomment the code below and comment the code above, if you want test this project :-

// const express = require("express");
// const app = express();
// const bookRoutes = require("./routes/bookRoutes");
// const errorController = require("./controllers/errorController");

// app.use(express.json());

// app.use("/books", bookRoutes);

// app.use(errorController.handle404);
// app.use(errorController.handleErrors);

// module.exports = app;
