import { NextPage } from "next";
import Link from "next/link";
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
                    <div className="border-b-2 border-black p-2 my-4">
                        <h1 className="text-4xl text-left text-black font-bold">Skapa nytt uppdrag</h1>
                    </div>
                    <input id="assignmentTitle" className="rounded-2xl w-full block p-3.5 text-2xl bg-white border border-gray-300 focus:ring-mk-blue focus:border-mk-blue resize-none" placeholder="Titel" />
                    <div className="flex mt-6 gap-4">
                        <input id="assignmentPlace" className="rounded-2xl w-full block p-3.5 text-2xl bg-white border border-gray-300 focus:ring-mk-blue focus:border-mk-blue resize-none" placeholder="Plats" />
                        <input id="assignmentTime" className="rounded-2xl w-full block p-3.5 text-2xl bg-white border border-gray-300 focus:ring-mk-blue focus:border-mk-blue resize-none" placeholder="Tid" />
                        <input id="assignmentParticipants" className="rounded-2xl w-full block p-3.5 text-2xl bg-white border border-gray-300 focus:ring-mk-blue focus:border-mk-blue resize-none" placeholder="Antal deltagare" />
                    </div>
                    <textarea id="assignmentInfo" className="mt-6 h-[40vh] w-full flex-1 rounded-2xl block p-3.5 text-2xl bg-white border border-gray-300 focus:ring-mk-blue focus:border-mk-blue resize-none" placeholder="Beskrivning" />
                    <textarea id="assignmentMotivation" className="mt-6 h-[15vh] w-full flex-1 rounded-2xl block p-3.5 text-2xl bg-white border border-gray-300 focus:ring-mk-blue focus:border-mk-blue resize-none" placeholder="Motivering" />
                </div>
                <div className="relative bottom-10">
                    <div className="absolute bottom-3 left-0">
                        <Link href="/home">
                            <button className="bg-mk-yellow hover:bg-mk-yellow-hover text-white text-lg rounded-2xl font-bold px-6 py-2" type="button">Tillbaka</button>
                        </Link>
                        <Link href="/home" className="px-2">
                            <button className="  bg-mk-blue hover:bg-mk-blue-hover text-white text-lg rounded-2xl font-bold px-6 py-2" type="button">Spara</button>
                        </Link>
                    </div>
                    <div className="absolute bottom-3 right-0">
                        <Link href="/home">
                            <button className="  bg-mk-blue hover:bg-mk-blue-hover text-white text-lg rounded-2xl font-bold px-6 py-2" type="button">Skicka in</button>
                        </Link>
                    </div>
                </div>
            </MainPage>
        </>
    );
};

export default NewAssignment;
