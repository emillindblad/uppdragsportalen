import { NextPage } from "next";
import MainPage from "../components/MainPage";
import Image from "next/image";
import itLogo from "../../public/img/it-logo.png";

interface MainPageProps {
    title: React.ReactNode,
    children: React.ReactNode,
}

const NewAssignment: NextPage = () => {
    return (
        <>
            <MainPage title={"Nytt uppdrag"}>
                <div className="my-4 relative h-full">
                    <div className="border-b-2 border-black p-2 my-4">
                            <div className="flex">
                                <h1 className="text-4xl text-left text-black font-bold">Titel</h1>
                                <div className="flex relative right-0">
                                    <a href="/login" className="col-span-1 ms-2">
                                    <Image src={itLogo} alt="" className="max-w-[60px] mr-4 mb-2" />
                                    </a>
                                    <div className="items-start min-w-[150px]">
                                        <p className=" text-black font-bold text-lg tracking-wide">Julia Böckert</p>
                                        <p className=" text-black text-s font-semibold tracking-wide">phadder.nollkit@chalmers.it</p>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                <div className="relative bottom-10">
                    <div className="absolute bottom-3 left-0">
                        <a href="home">
                            <button className="bg-mk-yellow hover:bg-mk-yellow-hover text-white text-lg rounded-2xl font-bold px-6 py-2" type="button">Tillbaka</button>
                        </a>
                    </div>
                </div>
            </MainPage>
        </>
    );
};

export default NewAssignment;