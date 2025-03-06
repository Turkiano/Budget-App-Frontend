import { useQuery } from "@tanstack/react-query";
import { User } from "../Types/User";
import api from "../api/api";

export function Dashboard(){

    const getUsers = async()=>{
        try{
            const res = await api.get("/users")
            return res.data
        }
        catch (error){
            console.log(error);
            return Promise.reject(new Error("Something went wrong"))
            
        }
    }

    const {data, error, isLoading} = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: getUsers
    })

    if(isLoading) return <p>Users Data is Loading . . . </p>
    return(
        <>
        <div>
            <h1>Users Details</h1>
            <ul>
                {data?.map((users)=>(
                    <li key ={users.id}>{users.firstName}{users.lastName}{users.email}</li>
                    
                ))}
            </ul>
            {error && <p className="error">{error.message}</p>}
        </div>
                </>
    )
}