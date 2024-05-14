const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const dbConnection = require("./db");
const employee = require("./models/employee-models");
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const data = await employee.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json("Internal server error");
    console.log(error);
  }
});

app.post("/add-employee", async (req, res) => {
  try {
    const emp = await employee.findOne({ empId: req.body.empId });
    if (emp) {
      return res.status(400).json("employee already exist");
    }
    const data = await employee.create(req.body);
    res.status(200).json("Employee added");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});

app.put("/edit-employee", (req, res) => {});

app.delete("/delete-employee/:id", async (req, res) => {
  const data = await employee.deleteOne({ empId: req.params.id });
  res.status(200).json(data);
});
app.get("/search/:term", async (req, res) => {
  const regex = new RegExp(req.params.term, "i");
  const results = await employee.find({
    $or: [{ firstName: regex }, { designation: regex }],
  });

  if (results) {
    res.status(200).json(results);
  }
});

dbConnection(() => {
  app.listen(port, () => {
    console.log("Server running on port" + " " + port);
  });
});