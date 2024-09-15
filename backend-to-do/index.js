const express = require("express");
const { UserModel, TodoModel } = require("./models");
require("dotenv").config();
const { connectDB } = require("./db/index.js");

const { auth, JWT_SECRET } = require("./auth");
const jwt = require("jsonwebtoken");




const app = express();
connectDB();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  await UserModel.create({
    email: email,
    password: password,
    name: name,
  });

  res.json({
    messahe: "You are Logged in",
  });
});

app.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({
    email: email,
    password: password,
  });
//   console.log("user is", user);

  if (user) {
    const token = jwt.sign({
        userId:user._id
    },JWT_SECRET)

    res.json({
      message: "you are logged in",
      token:token
    });
  } else {
    res.status(404).json({
      message: " your credential incorrect",
    });
  }
});


app.post("/todo", auth, async function(req, res) {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        userId,
        title,
        done
    });

    res.json({
        message: "Todo created"
    })
});


app.get("/todos", auth, async function(req, res) {
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId
    });

    res.json({
        todos
    })
});


app.listen(3000, () => {
  console.log(" app is ruuning", 3000);
});
