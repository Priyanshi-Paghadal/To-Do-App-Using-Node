const mongoose = require("mongoose");

const task = new mongoose.Schema({
    name: String
})

const taskSchema = mongoose.model("task", task);

module.exports = taskSchema;