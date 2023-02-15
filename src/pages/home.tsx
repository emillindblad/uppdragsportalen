import { type NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import AssignmentData from "../components/AssignmentData";
import MainPage from "../components/MainPage";
import { api } from "../utils/api";

const Home: NextPage = () => {

    const {data: session} = useSession()
    //const session = useSession()

    //console.log(status)


    const uppdrag = api.uppdrag.getCurrentYearUppdrag.useQuery({ year: 2023 });
    const isMK = false;

    console.log(session)

    if (!session) {
        // Handle unauthenticated state, e.g. render a SignIn component
        console.log("client side")
        console.log(session)
        return <p>lol</p>;
    }

    return (
        <>
            <MainPage title={"Mottagningskommittén"}>
                <div className="my-4">
                    <p>{JSON.stringify(session)}</p>
                    <button onClick={() => signOut()} className="rounded border py-1 px-4" > Logout </button>
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
                            {uppdrag.data ? <AssignmentData data={uppdrag.data} /> : <tr><td>Loading...</td></tr>}
                        </tbody>
                    </table>
                </div>
                {isMK ? null :
                    (<div className="absolute bottom-4 right-8 ">
                        <button className="bg-mk-blue hover:bg-sky-900 text-white rounded-full p-3 " type="button">
                            <svg className="fill-white w-8 h-8" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                            </svg>
                        </button>
                    </div>)
                }
            </MainPage>
        </>
    );
};

export default Home;
