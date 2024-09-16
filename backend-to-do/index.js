const express = require("express");
const { UserModel, TodoModel } = require("./models");
require("dotenv").config();
const { connectDB } = require("./db/index.js");
const bcrypt = require('bcrypt');

const {z} = require('zod');

const { auth, JWT_SECRET } = require("./auth");
const jwt = require("jsonwebtoken");




const app = express();
connectDB();

app.use(express.json());





app.post("/signup", async (req, res) => {

// =============== here we are validating the inputs by using the zod library

const requestBody = z.object({
  email:z.string().min(3).max(13).email(),
  name: z.string().min(3).max(50),
  password: z.string()
})

// const parseData = requestBody.Parse(req.body); throw the error

const parseDataSuccess = requestBody.safeParse(req.body);

if( !parseDataSuccess.success){
  res.json({
    message : "Incorrect input formates",
    error : parseDataSuccess.error
  })
  return
}

  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
// here we are hashing the password 

const hashedPassword = await bcrypt.hash(password,2)
 console.log(" hasshed password ->", hashedPassword);
 


  await UserModel.create({
    email: email,
    password: hashedPassword,
    name: name,
  });

  res.json({
    messahe: "You are Logged in",
  });
});

app.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const response = await UserModel.findOne({
    email: email,
    // password: password,
  });
//   console.log("user is", user);

   if(! response){
    res.status(404).json({
      message: " User not found"
    })
   }

    const matchedPassword = await bcrypt.compare(password,response.password)


  if ( matchedPassword) {
    const token = jwt.sign({
        userId:response._id
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
