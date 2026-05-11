const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const authRoutes = require("./routes/authRoutes")
const protect = require("./middleware/authMiddleware")
const taskRoutes = require("./routes/taskRoutes")

const connectDB = require("./config/db")

dotenv.config()

connectDB()

const app = express()

const PORT = process.env.PORT || 5000

// middleware
app.use(express.json())
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://task-manager-delta-lake.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

app.options("/*", cors())

const User = require("./models/User")
app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)

// route
app.get("/", (req, res) => {
    res.send("Server Running")
})

app.get("/api/protected", protect, (req, res) => {

    res.json({
        message: "Protected Route Accessed",
        user: req.user
    })

})



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})