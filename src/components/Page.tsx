import { useCallback, useEffect, useState } from "react";

interface PageProps {
    children: React.ReactNode,
}

// Function to change greeting on login page
function Greeting() {
    // Creating time variable
    const currentHour = new Date().getHours();

    const greeting = 
    currentHour < 11 ? 'Godmorgon' : 
    currentHour > 11 && currentHour < 17 ? 'Goddag' :
    currentHour > 17 && currentHour < 22 ? 'Godkväll' :
    'Sov';

    return (<p>{greeting} gemene teknolog!</p>)
}

const Page = (props: PageProps) => {
    
    return (
        <div className="flex flex-col items-center w-screen justify-center bg-cover bg-center bg-mk-bg h-screen"> 
            <span id="greeting" className="m-12 text-mk-yellow text-7xl text-center font-bold drop-shadow-lg">{Greeting()}</span>
            <div className="w-[60%] h-[70%] bg-white rounded-xl drop-shadow-lg">
                {props.children}
            </div>
        </div>
    )
};

export default Page;
