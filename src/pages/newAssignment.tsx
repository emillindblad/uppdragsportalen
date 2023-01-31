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
                    <input id="assignmentTitle" className="rounded-2xl w-full block p-3.5 text-2xl bg-white border border-gray-300 focus:ring-mk-blue focus:border-mk-blue resize-none" placeholder="Titel" />
                    <div className="flex mt-6 gap-4">
                        <input id="assignmentPlace" className="rounded-2xl w-full block p-3.5 text-2xl bg-white border border-gray-300 focus:ring-mk-blue focus:border-mk-blue resize-none" placeholder="Plats" />
                        <input id="assignmentTime" className="rounded-2xl w-full block p-3.5 text-2xl bg-white border border-gray-300 focus:ring-mk-blue focus:border-mk-blue resize-none" placeholder="Tid" />
                        <input id="assignmentParticipants" className="rounded-2xl w-full block p-3.5 text-2xl bg-white border border-gray-300 focus:ring-mk-blue focus:border-mk-blue resize-none" placeholder="Antal deltagare" />
                    </div>
                    <textarea id="assignmentInfo" className="mt-6 h-[50%] w-full flex-1 rounded-2xl block p-3.5 text-2xl bg-white border border-gray-300 focus:ring-mk-blue focus:border-mk-blue resize-none" placeholder="Beskrivning" />
                    <textarea id="assignmentMotivation" className="mt-6 h-[15%] w-full flex-1 rounded-2xl block p-3.5 text-2xl bg-white border border-gray-300 focus:ring-mk-blue focus:border-mk-blue resize-none" placeholder="Motivering" />
            </div>
            <div className="relative bottom-10 ">
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