import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Dashboard() {

    const [tasks, setTasks] = useState([])
    const [title, setTitle] = useState("")

    const navigate = useNavigate()

    const token = localStorage.getItem("token")

    useEffect(() => {

        if (!token) {
            navigate("/login")
        } else {
            fetchTasks()
        }

    }, [])

    const fetchTasks = async () => {

        try {

            const response = await axios.get(
                    "https://task-manager-g1sx.onrender.com/api/tasks",                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setTasks(response.data)

        } catch (error) {
            console.log(error)
        }

    }

    const createTask = async () => {

        if (!title) return

        try {

            await axios.post(
                "https://task-manager-g1sx.onrender.com/api/tasks",
                {
                    title
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setTitle("")

            fetchTasks()

        } catch (error) {
            console.log(error)
        }

    }

    const deleteTask = async (id) => {

        try {

            await axios.delete(
                `https://task-manager-g1sx.onrender.com/api/tasks/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            fetchTasks()

        } catch (error) {
            console.log(error)
        }

    }

    const toggleTask = async (task) => {

        try {

            await axios.put(
                `hhttps://task-manager-g1sx.onrender.com/api/tasks/${task._id}`,
                {
                    completed: !task.completed
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            fetchTasks()

        } catch (error) {
            console.log(error)
        }

    }

    const logout = () => {

        localStorage.removeItem("token")

        navigate("/login")

    }

    return (

        <div className="container">

            <div className="card">

                <h1>Dashboard</h1>

                <button className="logout-btn" onClick={logout}>
                    Logout
                </button>

                <input
                    type="text"
                    placeholder="Enter New Task"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <button onClick={createTask}>
                    Add Task
                </button>

                {
                    tasks.map((task) => (

                        <div className="task" key={task._id}>

                            <h3>{task.title}</h3>

                            <p>
                                {
                                    task.completed
                                    ? "✅ Completed"
                                    : "⏳ Pending"
                                }
                            </p>

                            <div className="task-buttons">

                                <button onClick={() => toggleTask(task)}>
                                    Toggle
                                </button>

                                <button onClick={() => deleteTask(task._id)}>
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))
                }

            </div>
                <div className = "footer">
               <h1>@2026 Designed by Nithin Sajjanapu</h1>
            </div>
        </div>

    )

}

export default Dashboard
