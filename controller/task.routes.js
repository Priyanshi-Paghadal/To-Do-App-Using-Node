const express = require("express");
const Task = require("../model/model.task")

const taskRoutes = express.Router();

// ADD DATA

taskRoutes.post("/addData", async(req, res) => {
    console.log(req.body)
    const newtask = new Task({
        name: req.body.name
    })

    const alltask = await newtask.save();
    console.log(alltask)
    res.send(alltask);
})

// GET DATA

taskRoutes.get("/getData" , async(req,res)=>{
    const getData = await Task.find()
    console.log(getData)
    res.send(getData)
})

// DELETE DATA

taskRoutes.delete("/delete/:id" , async(req,res)=>{
    const id = req.params.id;
    console.log(id);
    const deleteData = await Task.findByIdAndDelete(id)
    console.log(deleteData)
    res.send(deleteData);
})

// UPDATE DATA

taskRoutes.put("/edit/:id", async(req,res)=>{
    const id = req.params.id;
    const {name } = req.body;
    const updateData = await Task.findByIdAndUpdate(id , {name})
    res.send(updateData)
    console.log(updateData);
})

module.exports = taskRoutes;