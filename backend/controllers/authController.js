const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//REGISTER USER---
const registerUser = async (req, res) => {

    try {

        const { email, password } = req.body

        // check user exists
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // create user
        const user = await User.create({
            email,
            password: hashedPassword
        })

        res.status(201).json({
            message: "User registered successfully",
            user
        })

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        })

    }

}

//LOGIN USER---
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body

        // check user exists
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            })
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            })
        }

        // generate token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.status(200).json({
            message: "Login Successful",
            token
        })

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        })

    }

}

module.exports = {
    registerUser,
    loginUser
}