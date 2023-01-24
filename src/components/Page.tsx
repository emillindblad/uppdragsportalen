interface PageProps {
    children: React.ReactNode;
}

const Page = (props: PageProps) => {
    return (
        <div className="flex flex-col items-center w-screen justify-center bg-cover bg-center bg-mk-bg h-screen">
            <h1 className="m-12 text-mk-yellow text-6xl font-bold drop-shadow-2xl">Godmorgon gemene teknolog!</h1>
            <div className="w-[60%] h-[70%] bg-white rounded-xl shadow-lg">
                {props.children}
            </div>
        </div>
    )
};

export default Page;
