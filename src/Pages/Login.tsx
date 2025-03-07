import { Link } from "react-router-dom"

export function Login(){

    const handleChange=()=>{

    }

    return(
        <div  className="loginContainer">
            <h1>Login Page</h1>
                <div className="loginForm">
            <form>
                <div>
                <input
                    name = "email"
                    type = "email"
                    placeholder="email"
                    onClick={handleChange}
                    />
                <input
                    name = "password"
                    type = "password"
                    placeholder="password"
                    onClick={handleChange}
                    />
                    
                                    </div>
                <button type = "button">Login</button>
                <p >Create an Account <Link to="/signUp"> here</Link></p>

            </form>
                    </div>
        </div>
    )

}