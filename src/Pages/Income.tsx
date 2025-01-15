import { useParams } from "react-router-dom"


export function Income(){
    
   const params = useParams()
   console.log("Params testing: ", params);
   
    return (
        <div>
            <h1>Income Page</h1>
            <p>we are testing this page</p>
        </div>
    )
}