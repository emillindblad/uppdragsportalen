
interface PageProps {
    children: React.ReactNode,
}

const Page = (props: PageProps) => {
    return (
        <div className="flex flex-col items-center w-screen justify-center bg-cover bg-center bg-mk-bg h-screen"> 
        <span className="m-12 text-mk-yellow text-7xl font-bold drop-shadow-lg">Godmorgon gemene teknolog!</span>
        <div className="w-[60%] h-[70%] bg-white rounded-xl drop-shadow-lg">
            {props.children}
        </div>
        </div>
    )
};

export default Page;
