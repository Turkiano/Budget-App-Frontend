import { Link } from "react-router-dom"
import api from "../api/api"
import { ChangeEvent, FormEvent, useState } from "react"

export function SignUp(){
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        phone: "null",
        email: "",
        password: ""
    })
    console.log("user inputs:", user);
    

    const handleSignUp = async() => {
        try{
            const res = await api.post('/users/signup', user)
            return res.data
        }
        catch(error){
            console.log(error);
            return Promise.reject(new Error("Something went wrong!!"))

            
        }
    }

    const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
        const {name, value, valueAsNumber} = e.target

        setUser({
            ...user,
            [name]: name === "phone" ? valueAsNumber :value 
        })



    }


    const handleSubmit = async (e: FormEvent) =>{
        e.preventDefault()
        await handleSignUp()

    }

    return(
        <div  className="SignUpContainer">
            <h1>SignUp Page</h1>
                <div className="SignUpForm">
            <form onSubmit={handleSubmit}>
                <div>
                <input
                    name = "firstName"
                    type = "firstName"
                    placeholder="firstName"
                    onChange={handleChange}
                    />
                <input
                    name = "lastName"
                    type = "lastName"
                    placeholder="lastName"
                    onChange={handleChange}
                    />
                <input
                    name = "phone"
                    type = "phone"
                    placeholder="phone"
                    onChange={handleChange}
                    />
                <input
                    name = "email"
                    type = "email"
                    placeholder="email"
                    onChange={handleChange}
                    />
                <input
                    name = "password"
                    type = "password"
                    placeholder="password"
                    onChange={handleChange}
                    />
                    
                                    </div>
                <button type = "button">SignUp</button>
                <p >Have an Account <Link to="/login"> Login</Link></p>

            </form>
                    </div>
        </div>
    )

}