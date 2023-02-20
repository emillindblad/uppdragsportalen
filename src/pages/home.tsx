import { type NextPage } from "next";
import Link from "next/link";
import AssignmentData from "../components/AssignmentData";
import MainPage from "../components/MainPage";
import useIsMK from "../hooks/useIsMK";
import { api } from "../utils/api";


const Home: NextPage = () => {

    const uppdrag = api.uppdrag.getCurrentYearUppdrag.useQuery({ year: 2023 });
    const isMK = useIsMK();

    return (
        <>
            <MainPage title={"Mottagningskommittén"}>
                <div className="my-4">
                    <div className="border-b-2 border-gray-300 overflow-hidden">
                        <input className="px-4 py-2 w-full h-15 border-none placeholder-[#737373] text-2xl" type="text" placeholder="Sök.." name="search" />
                    </div>
                </div>
                <div className="overflow-y-auto flex flex-rows-2">
                    <div className="w-full text-sm text-left text-black row-span-1">
                        <div className="text-xl text-[#737373] bg-white border-b-2 border-black">
                            <div className="text-xl flex flex-column-4">
                                <p className="column-span-1">Nolluppdrag</p>
                                <p className="column-span-1">NollK</p>
                                <p className="column-span-1">Status</p>
                                <p className="column-span-1">Övrigt</p>
                            </div>
                        </div>
                     <div className="row-span-1">
                            {uppdrag.data ? <AssignmentData data={uppdrag.data}/> : <p>Loading...</p> }
                    </div>
                    </div>
                </div>
                {isMK ? null :
                    (<div className="absolute bottom-4 right-8 ">
                        <Link href="/newAssignment">
                            <button className="bg-mk-blue hover:bg-sky-900 text-white rounded-full p-3 " type="button">
                                <svg className="fill-white w-8 h-8" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                </svg>
                            </button>
                        </Link>
                    </div>)
                }
            </MainPage>
        </>
    );
};

export default Home;
