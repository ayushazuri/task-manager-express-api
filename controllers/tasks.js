const Task = require("../models/task.js");

const getAllTasks = async (req, res) => {
	try {
		const tasks = await Task.find({});
		res.status(200).json({ tasks });
	} catch (error) {
		res.status(500).json(error);
	}
};

const createTasks = async (req, res) => {
	try {
		const task = await Task.create(req.body);
		res.status(201).json({ task });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const getTask = (req, res) => {
	res.send("get an items");
};

const updateTasks = (req, res) => {
	res.send("update items");
};

const deleteTasks = (req, res) => {
	res.send("delete items");
};

module.exports = {
	getAllTasks,
	createTasks,
	getTask,
	updateTasks,
	deleteTasks,
};
