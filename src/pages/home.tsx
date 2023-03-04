import { type NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { NextRequest } from "next/server";
import Link from "next/link";
import AssignmentData from "../components/AssignmentData";
import MainPage from "../components/MainPage";
import { api } from "../utils/api";
import IsMK from "../utils/IsMK";
import { useState, useEffect } from "react";
import { Uppdrag } from "@prisma/client";


const Home: NextPage = () => {

    const [sortStatus, setSortStatus] = useState<number>(0); // 0 = original order, 1 = ascending order, -1 = descending order
    const [icon, setIcon] = useState<string>("");
    const [uppdragData, setUppdragData] = useState<Uppdrag[] | undefined>();
    const uppdrag = api.uppdrag.getByYear.useQuery({ year: 2023 });
    const {data: session} = useSession();
    const isMK = IsMK()

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
        setUppdragData(uppdragData?.sort(sortByAscending(row)))
    }

    function descendingOrder(row : string) {
        setUppdragData(uppdragData?.sort(sortByDescending(row)))
    }

    // Order by row
    function orderRow(row: string) {
        setIcon(sortIcon(row));

        //case s of 0 = 1, 1 = -1, -1 = 0
        switch (sortStatus) {
            case 0: 
                setSortStatus(1);
                ascendingOrder(row);
                break;
            case 1:
                setSortStatus(-1);
                descendingOrder(row);
                break;
            case -1:
                setSortStatus(0);
                if (uppdrag.data != null) setUppdragData([...uppdrag.data]) 
                    else setUppdragData(undefined)
                break;
            default:
                console.error(`Illegal value of sortStatus: ${sortStatus}`)
        }
        return;
    }

    // Sort specfifc header
    function sortIcon(id : string) {
        const arrows = { ascending: '↓', descending: '↑' }
        
        let dir = "";
        if (sortStatus === 1) {
            dir = "ascending";
        } else if (sortStatus === -1) {
            dir = "descending";
        } else dir = "default";
        
        const arrow : string = id ? arrows[dir] : '';
      
        return arrow; 
    } 



    return (
        <>
            <MainPage title={"Mottagningskommittén"}>
                <div className="my-4">
                    <p>{JSON.stringify(session)}</p>
                    <div className="border-b-2 border-gray-300 overflow-hidden">
                        <input className="px-4 py-2 w-full h-15 border-none placeholder-[#737373] text-2xl" type="text" placeholder="Sök.." name="search" />
                    </div>
                </div>
                <div className="overflow-y-auto">
                    <div className="w-full text-left text-black">
                        <div className="text-xl text-[#737373] bg-white">
                            <div className="text-xl grid grid-cols-5 justify-between border-b-2 border-gray-300">
                                <p onClick={() => orderRow('title')} className="flex col-span-1 ml-4 mb-2 hover:cursor-pointer">Namn på uppdrag {icon}</p>
                                <p onClick={() => orderRow('time')} className="col-span-1 hover:cursor-pointer">Tid {icon}</p>
                                <p onClick={() => orderRow('status')} className="col-span-1 hover:cursor-pointer">Status {icon}</p>
                                <p onClick={() => orderRow('desc')} className="col-span-2 hover:cursor-pointer">Övrigt {icon}</p>
                                {/* <SortIcon id='time' sortBy='time' label='Tid' specs='col-span-1 hover:cursor-pointer'/>
                                <SortIcon id='status' sortBy='status' label='Status' specs='col-span-1 hover:cursor-pointer'/>
                                <SortIcon id='desc' sortBy='desc' label='Övrigt' specs='col-span-2 hover:cursor-pointer'/> */}
                            </div>
                        </div>
                        <div className="border-b-2 border-gray-300">
                            {uppdragData ? <AssignmentData data={uppdragData}/> : <p>Loading...</p> }
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
                    </div>)
                }
            </MainPage>
        </>
    );
};

export default Home;
