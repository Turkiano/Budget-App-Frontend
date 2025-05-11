import AboutMeSection from "@/Components/AboutMeSection";
import { NavigationMenu } from "@/Components/NavigationMenu";

export function About(){

    return (
        <div>
             <div className='w-full'>
            
                <NavigationMenu />
                </div>
            {/* <h1>About us page!</h1> */}
            <AboutMeSection/>
        </div>
    )
}