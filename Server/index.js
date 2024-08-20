const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("./verifyToken");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb+srv://anandkr369:Kumaranand369@cluster0.xgzq1qs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Database connected successfully...");
  })
  .catch(() => {
    console.log("Something went wrong while connecting to the database...");
  });

// User Schema
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is mandatory"],
  },
  password: {
    type: String,
    required: [true, "Password is mandatory"],
  },
  name: {
    type: String,
  },
  mobile: {
    type: String,
    minLength: [10, "Mobile length should be 10 only"],
  },
  score: { // Added field for storing score
    type: String, // or Number based on your needs
  },
});

const userModel = mongoose.model("users", userSchema);

// Test Schema
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

// Score Schema
const scoreSchema = mongoose.Schema({
  email: String,
  name: String,
  score: String,
  date: String,
});
const scoreModel = mongoose.model("scores", scoreSchema);

// Register User
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
                .send({ message: "Registration successful", data: info });
            })
            .catch((err) => {
              res
                .status(500)
                .send({ error: "Something went wrong during registration" });
            });
        }
      });
    }
  });
});

// Login User
app.post("/login", (req, res) => {
  let data = req.body;

  userModel
    .findOne({ username: data.email })
    .then((info) => {
      if (info != null) {
        bcryptjs.compare(data.password, info.password, (err, result) => {
          if (!err) {
            if (result) {
              jwt.sign({ id: info._id }, "saikey", (err, token) => {
                if (!err) {
                  res.status(200).send({
                    message: "Login successful",
                    status: true,
                    token: token,
                    data: info,
                  });
                } else {
                  res.status(500).send({ message: "Error generating token" });
                }
              });
            } else {
              res
                .status(402)
                .send({ status: false, message: "Password is incorrect" });
            }
          } else {
            res.status(500).send({ message: "Error comparing passwords" });
          }
        });
      } else {
        res.status(404).send({
          status: false,
          message: "Username is incorrect or not registered",
        });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: false, error: "Something went wrong" });
    });
});

// Fetch MCQs
app.get("/mcqs", verifyToken, (req, res) => {
  testModel
    .find({})
    .then((data) => {
      res.status(200).send({ mcqs: data });
    })
    .catch((err) => {
      res.status(500).send({ error: "Something went wrong" });
    });
});

// Save Test Score
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
        .send({ message: "❌ Something went wrong", name: data.name });
    });
});

// Upload Test (MCQ)
app.post("/upload-test", verifyToken, (req, res) => {
  const { question, options, correctAnswer } = req.body;

  const newTest = new testModel({
    question,
    options,
    correctAnswer,
  });

  newTest
    .save()
    .then((data) => {
      res.status(200).send({ message: "Test uploaded successfully", data });
    })
    .catch((err) => {
      res.status(500).send({ error: "Something went wrong while uploading the test" });
    });
});

// Get Score
app.get('/getScore', verifyToken, async (req, res) => {
  const userId = req.user.id; // Extracted user ID from token
  try {
    const user = await userModel.findById(userId); // Find user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const score = user.score; // Retrieve score from user
    res.json({ score });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving score' });
  }
});

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
