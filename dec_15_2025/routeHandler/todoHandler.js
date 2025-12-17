const express = require("express");
const router = express.Router();

const todoSchema = require("../schemas/todoSchemas");
const mongoose = require("mongoose");

const Tasks = new mongoose.model("Task", todoSchema);
// get all todo
router.get("/", async (req, res) => {});
// get todo by id
router.get("/:id", async (req, res) => {});

// post todo
router.post("/", async (req, res) => {
  try {
    const newTask = new Tasks(req.body);
    const result = await newTask.save();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// post multiple todo

router.post("/all", async (req, res) => {});

// put to do
router.put("/:id", async (req, res) => {});

// delete to do

router.delete("/:id", async (req, res) => {});

module.exports = router;
