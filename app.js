const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const sequelize = require("./dbConfig");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

const PORT = process.env.PORT || 3000;

try {
  sequelize
    .authenticate()
    .then(() => {
      console.log("db connected successfully.");
    })
    .then((result) => {
      app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
    });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.get("/", async (req, res, next) => {
  res.send({ message: "Awesome it works 🐻" });
});

app.use("/api", require("./routes/api.route"));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});
