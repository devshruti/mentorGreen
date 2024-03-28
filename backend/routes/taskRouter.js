const express = require("express");
const { authMiddleware } = require("../middleware/authenticate")
const jwt = require("jsonwebtoken");
const { TaskModel } = require("../models/taskModel");
const taskRouter = express.Router();

taskRouter.use(authMiddleware)
/* ================================= This route is used for getting data using searching sort title =============================== */
// taskRouter.get("/", async (req, res) => {
//   const title = req.query.title;
//   const sortData = req.query.sort;
//   try {
//     if (title) {
//       const data = await TaskModel.find({ title });
//       res.status(200).json(data);
//       console.log("taskDAtatitle: ", data)
//     } else if (sortData && title) {
//       if (sortData == "asc") {
//         const data = await TaskModel.find({ title }).sort({ date: 1 });
//         res.status(200).json(data);
//       } else {
//         const data = await TaskModel.find({ title }).sort({ date: -1 });
//         res.status(200).json(data);
//       }
//     } else if (sortData) {
//       if (sortData == "asc") {
//         const data = await TaskModel.find().sort({ date: 1 });
//         res.status(200).json(data);
//       } else {
//         const data = await TaskModel.find().sort({ date: -1 });
//         res.status(200).json(data);
//       }
//     } else {
//       const data = await TaskModel.find();
//       res.status(200).json(data);
//       console.log("taskDAta", data, "no filter")
//     }
//   } catch (error) {
//     res.status(404).send({ message: "Data not Found", error: error.message })
//   }
// });

taskRouter.get("/", async (req, res) => {
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, process.env.secretkey);
  const userId = decodedToken.userId// Extract user ID from the request object

  try {
    const data = await TaskModel.find({ createdBy: userId });
    res.status(200).json(data);
    console.log("uId", userId, "taskDAtatitle: ", data)
  } catch (error) {
    res.status(404).send({ message: "Data not found", error: error.message });
  }
});



/* =========================== This route for Adding the data to the database ====================================== */

taskRouter.post("/create", async (req, res) => {
  const payload = req.body;
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, process.env.secretkey);
  const userID = decodedToken.userId
  console.log("userId:", decodedToken.userId);
  const userId = userID; // Assuming you have user information in the request, adjust this based on your authentication setup

  try {
    // Include the user ID when creating the task
    const task = new TaskModel({
      ...payload,
      createdBy: userId,
    });

    await task.save();
    console.log("task",task , userId)
    res.status(200).json("Task Created Successfully!");
    console.log("created task")
  } catch (error) {
    console.log("create error", error)
    res.status(400).send({ message: "Task not created", error: error.message });
  }
});

/* ================================== This Route for Updating the data ========================= */

taskRouter.patch("/update/:id", async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await TaskModel.findByIdAndUpdate(
      { _id: taskId },
      req.body, // Assuming you have an update payload in req.body
      { new: true } // This option returns the modified document rather than the original
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
});



/* ================================== This Route for Deleted  the data ============================= */

taskRouter.delete("/delete/:id", async (req, res) => {
  const taskId = req.params.id;
  try {
    await TaskModel.findByIdAndDelete(taskId); // Pass taskId directly as a string
    res.status(200).json({ message: `The task of ${taskId} is deleted successfully` });
  } catch (error) {
    res.status(400).send({ message: "Unable to delete", error: error.message });
  }
});


module.exports = {
  taskRouter
}