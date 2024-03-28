const express = require("express");
const { connectedDB } = require("./db");
const { userRouter } = require("./routes/userRouter");
const cors = require("cors");
const { taskRouter } = require("./routes/taskRouter");
const app = express();

app.use(cors())
app.use(express.json())
app.get("/", async (req, res) => {
    try {
        res.send("Home-Page")
    }
    catch (error) {
        console.log(`Error:${error}`)
    }
})

app.use("/user", userRouter)

app.use("/tasks", taskRouter)

const port = process.env.port || 8080
app.listen(port, async () => {
    try {
        //connected db
        await connectedDB
        console.log("Database connected Successfully")
    }
    catch (err) {
        console.log(err.message)
    }
    console.log(`server is running on port ${port}`)
})