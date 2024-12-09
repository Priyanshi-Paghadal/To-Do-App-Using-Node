const express = require("express");
const mongoose = require("mongoose");
const app = express()

const ejs = require("ejs");

// const {connection} = require("./connection/db");
const taskRoutes = require("./controller/task.routes");
const task = require("./model/model.task");

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.set("view engine", "ejs");
app.use("/tasks", taskRoutes);

const port = 8888;

mongoose.connect("mongodb+srv://paghadalpriyanshi704:helloradhu_123@cluster0.2hyok.mongodb.net/To-Do_App", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
})
.then(() => console.log("Connected to MongoDB via Mongoose!"))
.catch((err) => console.error("Connection error:", err));

app.get("/", async(req,res) => {
    let tasks = await task.find()
    res.render("home" , {
        allTask : tasks
    });
});

// ADD DATA

app.post("/addData" , async(req,res)=>{
    const { name} = req.body;
    const newtask = new task({ name});
    await newtask.save();
    res.redirect("/");
})

// DELETE DATA

app.get("/delete", async (req, res) => {
    let id = req.query.id;
    console.log(id);
    let deleteData = await task.findByIdAndDelete(id);
    console.log(deleteData);
    res.redirect("/")
})

// EDIT DATA

app.get("/edit/:id", async (req, res) => {
    let id = req.params.id;
    let editData = await task.findById(id);
    res.render('editData', { editData });
})

app.post("/editData/:id", async (req, res) => {
    let editId = req.params.id;
    let allTask = await task.findByIdAndUpdate(editId, req.body);
    res.redirect("/");
})

app.listen(port, async() => {
    // await connection;
    console.log("server is running at port ", port);
})