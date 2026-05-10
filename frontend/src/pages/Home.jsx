import { Link } from "react-router-dom"

function Home() {

    return (

        <div className="container">

            <div className="card">

                <div className="logo">🚀</div>

                <h1>Task Manager</h1>

                <p className="subtitle">
                    Organize your daily work beautifully
                </p>

                <div className="home-buttons">

                    <Link to="/login">
                        <button>
                            Login
                        </button>
                    </Link>

                    <Link to="/register">
                        <button>
                            Register
                        </button>
                    </Link>

                </div>

            </div>
            <div className = "footer">
               <h1>@2026 Designed by Nithin Sajjanapu</h1>
            </div>
            
        </div>
        

    )

}

export default Home
