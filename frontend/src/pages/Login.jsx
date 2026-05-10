import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleLogin = async (e) => {

        e.preventDefault()

        try {

            const response = await axios.post(
                "https://task-manager-4bn7.onrender.com/api/auth/login",
                {
                    email,
                    password
                }
            )

            localStorage.setItem(
                "token",
                response.data.token
            )

            navigate("/dashboard")

        } catch (error) {

            if (error.response) {
                alert(error.response.data.message)
            } else {
                alert("Server Error")
            }

        }

    }

    return (

        <div className="container">

            <div className="card">

                <div className="logo">🔐</div>

                <h1>Welcome Back</h1>

                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

                <p className="link-text">
                    New user? <Link to="/register">Register</Link>
                </p>

            </div>
            <div className = "footer">
               <h1>@2026 Designed by Nithin Sajjanapu</h1>
            </div>
        </div>
        

    )

}

export default Login
