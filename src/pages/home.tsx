import { type NextPage } from "next";
import AssignmentData from "../components/AssignmentData";
import MainPage from "../components/MainPage";


const Home: NextPage = () => {
    return (
        <>
            <MainPage title={"Mottagningskommittén"}>
                <div className="my-4">
                    <div className="border-b-2 border-gray-300 overflow-hidden">
                        <input className="px-4 py-2 w-full h-15 border-none placeholder-[#737373] text-2xl" type="text" placeholder="Sök.." name="search" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-black">
                        <thead className="text-lg text-[#737373] bg-white border-b-2 border-black">
                            <tr>
                                <th className="px-6 py-4" scope="col">Nolluppdrag</th>
                                <th className="px-6 py-4" scope="col">NollK</th>
                                <th className="px-6 py-4" scope="col">Status</th>
                                <th className="px-6 py-4" scope="col">Övrigt</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AssignmentData/>
                        </tbody>
                    </table>
                </div>
                <div className="absolute bottom-3 right-3 py-2">
                    <button className="bg-mk-blue hover:bg-sky-900 text-white rounded-full p-3 " type="button">
                        <svg className="fill-white w-6 h-6" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                        </svg>
                    </button>
                </div>
            </MainPage>
        </>
    );
};

export default Home;
