const Task = require("../models/Task")

// CREATE TASK
const createTask = async (req, res) => {

    try {

        const { title } = req.body

        const task = await Task.create({
            title,
            user: req.user.id
        })

        res.status(201).json(task)

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        })

    }

}

// GET TASKS
const getTasks = async (req, res) => {

    try {

        const tasks = await Task.find({
            user: req.user.id
        })

        res.status(200).json(tasks)

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        })

    }

}


// UPDATE TASK
const updateTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id)

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            })
        }

        // check ownership
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: "Not Authorized"
            })
        }

        task.title = req.body.title || task.title
        task.completed = req.body.completed ?? task.completed

        const updatedTask = await task.save()

        res.status(200).json(updatedTask)

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        })

    }

}


// DELETE TASK
const deleteTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id)

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            })
        }

        // ownership check
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: "Not Authorized"
            })
        }

        await task.deleteOne()

        res.status(200).json({
            message: "Task deleted"
        })

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        })

    }

}


module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
}