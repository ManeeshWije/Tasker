const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

//establishing mongodb connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch(console.error);

const Todo = require("./models/Todo");

//display current todos
app.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
  console.log("testing app.get(getting todos)" + todos);
});

//add a todo
app.post("/todo/new", (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    //complete: req.body.complete,
  });
  todo.save();
  res.json(todo);
  console.log("testing app.post(new todos)" + todo);
});

//delete an existing todo by id
app.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id); //this breaks because of below i think
  res.json(result);
  console.log("testing app.delete(delete todo)" + result);
});

//set completed to an existing todo by id
app.get("/todo/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.complete = !todo.complete;
  todo.save();
  //todo.update();
  res.json(todo);
  console.log("testing app.get(complete todo)" + todo);
});

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => console.log("Server started on port " + PORT));
