import { NextPage } from "next";
import MainPage from "../components/MainPage";

interface MainPageProps {
    title: React.ReactNode,
    children: React.ReactNode,
}

const NewAssignment: NextPage = () => {
    return (
        <>
            <MainPage title={"Nytt uppdrag"}>
            <div className="my-4 relative h-full">
                    <textarea id="assignmentTitle" rows={1} className="rounded-2xl w-full block p-3.5 text-2xl bg-white border border-gray-300 focus:ring-mk-blue focus:border-mk-blue resize-none" placeholder="Title"></textarea>
                    <textarea id="assignmentInfo" className="mt-6 h-[70%] w-full flex-1 rounded-2xl block p-3.5 text-lg bg-white border border-gray-300 focus:ring-mk-blue focus:border-mk-blue resize-none" placeholder="Beskrivning"></textarea>
            </div>
            <div className="relative bottom-0">
                <div className="absolute bottom-3 left-0">
                    <a href="home">
                        <button className="bg-mk-yellow hover:bg-mk-yellow-hover text-white text-lg rounded-2xl font-bold px-6 py-2" type="button">Tillbaka</button>
                    </a>
                    <a href="home" className="px-2">
                        <button className="  bg-mk-blue hover:bg-mk-blue-hover text-white text-lg rounded-2xl font-bold px-6 py-2" type="button">Spara</button>
                    </a>
                </div>
                <div className="absolute bottom-3 right-0">
                    <a href="home">
                        <button className="  bg-mk-blue hover:bg-mk-blue-hover text-white text-lg rounded-2xl font-bold px-6 py-2" type="button">Skicka in</button>
                    </a>
                </div>
            </div>
            </MainPage>
        </>
    );
};

export default NewAssignment;