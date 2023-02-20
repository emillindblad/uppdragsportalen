import { type NextPage } from "next";

import { signOut, useSession } from "next-auth/react";
import { NextRequest } from "next/server";

import Link from "next/link";

import AssignmentData from "../components/AssignmentData";
import MainPage from "../components/MainPage";
import { api } from "../utils/api";
import IsMK from "../utils/IsMK";

const Home: NextPage = () => {

    const {data: session} = useSession();

    const uppdrag = api.uppdrag.getByYear.useQuery({ year: 2023 });
    const isMK = IsMK()
    return (
        <>
            <MainPage title={"Mottagningskommittén"}>
                <div className="my-4">
                    <p>{JSON.stringify(session)}</p>
                    <div className="border-b-2 border-gray-300 overflow-hidden">
                        <input className="px-4 py-2 w-full h-15 border-none placeholder-[#737373] text-2xl" type="text" placeholder="Sök.." name="search" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-black">
                        <thead className="text-xl text-[#737373] bg-white border-b-2 border-black">
                            <tr>
                                <th className="py-4" scope="col">Nolluppdrag</th>
                                <th className="py-4" scope="col">NollK</th>
                                <th className="py-4" scope="col">Status</th>
                                <th className="py-4" scope="col">Övrigt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {uppdrag.data ? <AssignmentData data={uppdrag.data} /> : <tr><td>Loading...</td></tr>}
                        </tbody>
                    </table>
                </div>
                {isMK ? null :
                    (<div className="absolute bottom-4 right-8 ">
                        <Link href="/uppdrag/newuppdrag">
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
