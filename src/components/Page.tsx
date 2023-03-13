interface PageProps {
    children: React.ReactNode,
}

// Function to change greeting on login page
function Greeting() {
    // Creating time variable
    const currentHour = new Date().getHours();
    let greeting ='';

    if (currentHour >= 6 && currentHour < 10) {
        greeting = 'Godmorgon';
    } else if (currentHour >= 11 && currentHour <= 17) {
        greeting = 'Goddag';
    } else {
        greeting = 'Godkväll';
    }

    return (
        <>
            <p>{greeting} gemene teknolog!</p>
        </>
    );
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
