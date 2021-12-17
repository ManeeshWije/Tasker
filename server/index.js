const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

//connecting to mongodb
mongoose
	.connect("mongodb://127.0.0.1:27017/crud-todo-list", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to DB"))
	.catch(console.error);

const Todo = require("./models/Todo");

//display current todos
app.get("/todos", async (req, res) => {
	const todos = await Todo.find();
	res.json(todos);
});

//add a todo
app.post("/todo/new", (req, res) => {
	const todo = new Todo({
		text: req.body.text,
	});
	todo.save();
	res.json(todo);
});

//delete an existing todo by id
app.delete("/todo/delete/:id", async (req, res) => {
	const result = await Todo.findByIdAndDelete(req.params.id);
	res.json(result);
});

//set completed or not to an existing todo by id
app.put("/todo/complete/:id", async (req, res) => {
	const todo = await Todo.findById(req.params.id);
	todo.complete = !todo.complete;
	todo.save();
	res.json(todo);
});

app.listen(3001, () => console.log("Server started on port 3001"));
