const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("./verifyToken");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/cipherschools")
  .then(() => {
    console.log("database connected successfully...");
  })
  .catch(() => {
    console.log("some thign went wrong while connecting database...");
  });

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is mandatory"],
  },
  password: {
    type: String,
    required: [true, "password is mandatory"],
  },
  name: {
    type: String,
  },
  mobile: {
    type: String,
    minLength: [10, "mobile length should be 10 only"],
  },
});

const userModel = mongoose.model("users", userSchema);

const testSchema = mongoose.Schema({
  question: {
    type: String,
  },
  options: {
    type: [String],
  },
  correctAnswer: {
    type: String,
  },
});

const testModel = mongoose.model("MCQs", testSchema);

const scoreSchema = mongoose.Schema({
  email: String,
  name: String,
  score: String,
  date: String,
});
const scoreModel = mongoose.model("scores", scoreSchema);

app.post("/register", (req, res) => {
  let data = req.body;
  bcryptjs.genSalt(10, (err, salt) => {
    if (!err) {
      bcryptjs.hash(data.password, salt, (err, npass) => {
        if (!err) {
          data.password = npass;
          userModel
            .create(data)
            .then((info) => {
              res
                .status(200)
                .send({ message: "register successfull", data: info });
            })
            .catch((err) => {
              res
                .status(500)
                .send({ error: "some thing went wrong while register" });
            });
        }
      });
    }
  });
});

app.post("/login", (req, res) => {
  let data = req.body;

  userModel
    .findOne({ username: data.email })
    .then((info) => {
      if (info != null) {
        bcryptjs.compare(data.password, info.password, (err, result) => {
          if (!err) {
            if (result == true) {
              jwt.sign({ email: data.email }, "saikey", (err, token) => {
                if (!err) {
                  res.status(200).send({
                    message: "login success",
                    status: true,
                    token: token,
                    data: info,
                  });
                }
              });
            } else {
              res
                .status(402)
                .send({ status: false, message: "password is Incorrect..." });
            }
          }
        });
      } else {
        res.status(404).send({
          status: false,
          message: "username is incorrect / not register",
        });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: false, error: "some thing went wrong ..." });
    });
});

app.get("/mcqs", verifyToken, (req, res) => {
  testModel
    .find({})
    .then((data) => {
      res.status(200).send({ mcqs: data });
    })
    .catch((err) => {
      res.status(500).send({ error: "some thing went wrong" });
    });
});

app.post("/save-score", (req, res) => {
  let data = req.body;
  scoreModel
    .create(data)
    .then((data) => {
      res
        .status(200)
        .send({ message: "Test completed successfully", name: data.name });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "❌ something went wrong ", name: data.name });
    });
});

app.listen(3000, () => {
  console.log("server is running at 3000");
});
