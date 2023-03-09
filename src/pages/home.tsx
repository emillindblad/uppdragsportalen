import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import AssignmentData from "../components/AssignmentData";
import MainPage from "../components/MainPage";
import { api } from "../utils/api";
import { useState, useEffect } from "react";
import type { Uppdrag } from "@prisma/client";
import { getServerAuthSession } from "../server/auth";
import { useSession } from "next-auth/react";

export const getServerSideProps: GetServerSideProps = async ( ctx ) => {
    const session = await getServerAuthSession(ctx);
    return {
        props: { session },
    }
}

const Home: NextPage = () => {
    // Usestate hook for sorting table of Uppdrag
    const [sortStatus, setSortStatus] = useState<number>(0); // 0 = original order, 1 = ascending order, -1 = descending order
    const [icon, setIcon] = useState<string>("");

    const { data: session } = useSession();

    const [uppdragData, setUppdragData] = useState<Uppdrag[] | undefined>();
    const uppdrag = api.uppdrag.getByYear.useQuery({ year: 2023 });
    const {data: isMK} = api.user.getUserStatus.useQuery();

    const [searchValue, setSearchValue] = useState("");


    // to track which header is clicked
    const [titleClicked, setTitleClicked] = useState(false);
    const [timeClicked, setTimeClicked] = useState(false);
    const [statusClicked, setStatusClicked] = useState(false);
    const [miscClicked, setMiscClicked] = useState(false);

    useEffect(() => {
        if (uppdrag.data != null) setUppdragData([...uppdrag.data])
    },[uppdrag.data]);

    // functions to sort Uppdrag by ascending/descending order
    function sortByAscending(attribute : string) {
        return function(first : Uppdrag, second : Uppdrag) {
            return (first[attribute as keyof typeof first] > second[attribute as keyof typeof second] ? 1 : -1)
        }
    }

    function sortByDescending(attribute : string) {
        return function(first : Uppdrag, second : Uppdrag) {
            return (first[attribute as keyof typeof first] > second[attribute as keyof typeof second] ? -1 : 1)
        }
    }

    function ascendingOrder(row : string) {
        setUppdragData(uppdragData?.sort(sortByAscending(row)));
    }

    function descendingOrder(row : string) {
        setUppdragData(uppdragData?.sort(sortByDescending(row)));
    }

    // Order by row
    function orderRow(row: string) {
        switch (sortStatus) {
            case 0:
                setSortStatus(1);
                ascendingOrder(row);
                setIcon('↓');
                break;
            case 1:
                setSortStatus(-1);
                descendingOrder(row);
                setIcon('↑');
                break;
            case -1:
                setSortStatus(0);
                setIcon('');
                if (uppdrag.data != null) setUppdragData([...uppdrag.data])
                    else setUppdragData(undefined)
                break;
            default:
                console.error(`Illegal value of sortStatus: ${sortStatus}`)
        }
        return;
    }

    // Serach in table
    


    return (
        <>
            <MainPage session={session} title={"Mottagningskommittén"}>
                <div className="my-4">
                    {/* <p>{JSON.stringify(session)}</p> */}
                    <div className="border-b-2 border-gray-300 overflow-hidden">
                        <input className="px-4 py-2 w-full h-15 border-none placeholder-[#737373] text-2xl" type="text" placeholder="Sök.." name="search" value={searchValue} onChange={e => setSearchValue(e.target.value)} />
                    </div>
                </div>
                {/* overflow-y-auto */}
                <div className="">
                    <div className="w-full text-left text-black">
                        <div className="text-xl text-[#737373] bg-white">
                            <div className="text-xl grid grid-cols-5 justify-between border-b-2 border-gray-300">
                                <p onClick={() => {orderRow('title'); setTitleClicked(true); setTimeClicked(false); setStatusClicked(false); setMiscClicked(false);}} className="flex col-span-1 ml-4 mb-2 hover:cursor-pointer select-none">Namn på uppdrag {titleClicked ? icon : ''}</p>
                                <p onClick={() => {orderRow('time'); setTitleClicked(false); setTimeClicked(true); setStatusClicked(false); setMiscClicked(false);}} className="col-span-1 hover:cursor-pointer select-none">Tid {timeClicked ? icon : ''}</p>
                                <p onClick={() => {orderRow('status'); setTitleClicked(false); setTimeClicked(false); setStatusClicked(true); setMiscClicked(false);}} className="col-span-1 hover:cursor-pointer select-none">Status {statusClicked ? icon : ''}</p>
                                <p onClick={() => {orderRow('desc'); setTitleClicked(false); setTimeClicked(false); setStatusClicked(false); setMiscClicked(true);}} className="col-span-2 hover:cursor-pointer select-none">Övrigt {miscClicked ? icon : ''}</p>
                            </div>
                        </div>
                        {/*  overflow-y-scroll */}
                        <div className="overflow-y-auto h-[82vh]">
                            {uppdragData ? <AssignmentData data={uppdragData.filter(u => u.title.includes(searchValue)
                                                                                    || u.time.includes(searchValue)
                                                                                    || u.desc.includes(searchValue))}/> 
                            : <p>Loading...</p> }
                        </div>
                    </div>
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
                    </div>)}
            </MainPage>
        </>
    );
};

export default Home;
