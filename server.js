// import express from 'express'
// const temp=require("./temp")
const express = require("express");
const mongoose = require("mongoose");
const { Dog } = require("./models");
const app = express();

// ...
// temp.a()
app.use(express.json());
app.get("/dogs", async (req, res) => {
  const allDogs = await Dog.find();
  return res.status(200).json(allDogs);
});

app.get("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  const dog = await Dog.findById(id);
  return res.status(200).json(dog);
});

app.post("/dogs", async (req, res) => {
  const newDog = new Dog({ ...req.body });
  const insertedDog = await newDog.save();
  return res.status(201).json(insertedDog);
});

app.put("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  await Dog.updateOne({ id }, req.body);
  const updatedDog = await Dog.findById(id);
  return res.status(200).json(updatedDog);
});
app.patch("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  const dog = await Dog.findById(req.params.id).exec();
  let query = { $set: {} };
  for (let key in req.body) {
    if (dog[key] && dog[key] !== req.body[key])
      // if the field we have in req.body exists, we're gonna update it
      query.$set[key] = req.body[key];
  }
  const updatedProduct = await Dog.updateOne(
    { _id: req.params.id },
    query
  ).exec();
  const updatedDog = await Dog.findById(id);
  return res.status(200).json(updatedDog);
});

app.delete("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  const deletedDog = await Dog.findByIdAndDelete(id);
  return res.status(200).json(deletedDog);
});
console.log("afhkjfah");
const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ramkrishnaindal:nWDMvHVL63V4wFbu@ramkrishna.yixfe.mongodb.net/animals?retryWrites=true&w=majority"
    );
    app.listen(3000, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
