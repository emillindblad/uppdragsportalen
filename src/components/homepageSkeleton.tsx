import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import AssignmentData from "./AssignmentData";
import MainPage from "./MainPage";
import { api } from "../utils/api";
import { useState, useEffect, FunctionComponent } from "react";
import type { Uppdrag } from "@prisma/client";


//om klickar på arkiv, kör den här queryn (varje query får en metod med data/refetch, se labb2)

interface HomeProps { //va1d ska vi ersätta denna med
    title : string,
    id: string
}
 
 export const HomePageSkeleton  = (props: HomeProps) => {

    
  // Usestate hook for sorting table of Uppdrag
  const [sortStateIndex, setSortStateIndex] = useState<number>(0);
  const sortStates: (number | undefined)[] = [undefined, 1, -1]; // unsorted, ascending, descending

  const [uppdragData, setUppdragData] = useState<Uppdrag[] | undefined>();
  const {data: isMK} = api.user.getUserStatus.useQuery();
  const {data: session} = useSession();
  //const uppdragQuery = api.uppdrag.getByNollK.useQuery({nollk: "", enabled:})
  
     //methods for deciding which query to run
     const { data : chalmersData, refetch : chalmers } = api.uppdrag.getAll.useQuery(undefined,{
        refetchOnWindowFocus: false,
        enabled: false
    });

    const { data : myNollkData, refetch : myNollk } = api.uppdrag.getByNollKThisYear.useQuery({
        nollk: "",
        year: 2023},
        {
        enabled: false,
        refetchOnWindowFocus: false,
        });

    const { data : NollKData, refetch : NollKs } = api.uppdrag.getByNollK.useQuery({ nollk: ""},{
        enabled: false,
        refetchOnWindowFocus: false,

    });

    const { data : granskaData, refetch : granska } = api.uppdrag.getByYear.useQuery({
        //refetchOnWindowFocus: false,
        year: 2023},
        {enabled: false,
        refetchOnWindowFocus: false,});

    // if(props.id === "chalmers"){
    //     void chalmers();
        
    // }
    // if(props.id === "NollKs"){
    //     void NollKs();
    // }
    // if(props.id === "myNollk"){
    //     void myNollk();
    // }
    // if(props.id === "granska"){
    //     void granska();
    // }

     //sorting algorithm
     useEffect(() => {
        if(props.id === "chalmers"){
            void chalmers();
            setUppdragData(chalmersData)
        }
        if(props.id === "nollks"){
            void NollKs();
            setUppdragData(NollKData)
        }
        if(props.id === "mynollk"){
            void myNollk();
            setUppdragData(myNollkData)
        }
        if(props.id === "granska") {
            void granska();
            setUppdragData(granskaData)
        }
     setSortStateIndex(1)
     },[NollKData, NollKs, chalmers, chalmersData, granska, granskaData, myNollk, myNollkData, props.id, uppdragData]);
 
     // Sort table
     function sortUppdragInTable(attribute: string, order: number) {
         return function(a: Uppdrag, b: Uppdrag) {
             return (a[attribute as keyof typeof a] > b[attribute as keyof typeof b] ? order : -order)
         }
     }
 
     // Order the rows by given status (unordered -> asecending -> descending)
     function orderRow(row: string) {
         setSortStateIndex((sortStateIndex + 1) % sortStates.length);
         const sortStatus = sortStates[sortStateIndex];
 
         if (sortStatus === undefined) {
             return uppdragData;
         }
 
         return uppdragData ? [...uppdragData].sort(sortUppdragInTable(row, sortStatus)) : undefined;
     }


 
 return (
        <>
            <MainPage title={props.title} session={session}>
                <div className="my-4">
                    {/* <p>{JSON.stringify(session)}</p> */}
                    <div className="border-b-2 border-gray-300 overflow-hidden">
                        <input className="px-4 py-2 w-full h-15 border-none placeholder-[#737373] text-2xl" type="text" placeholder="Sök.." name="search" />
                    </div>
                </div>
                {/* overflow-y-auto */}
                <div className="">
                    <div className="w-full text-left text-black">
                        <div className="text-xl text-[#737373] bg-white">
                            <div className="text-xl grid grid-cols-5 justify-between border-b-2 border-gray-300">
                                <p onClick={() => setUppdragData(orderRow('title'))} className="col-span-1 ml-4 mb-2 hover:cursor-pointer">Namn på uppdrag</p>
                                <p onClick={() => setUppdragData(orderRow('time'))} className="col-span-1 hover:cursor-pointer">Tid</p>
                                <p onClick={() => setUppdragData(orderRow('status'))} className="col-span-1 hover:cursor-pointer">Status</p>
                                <p onClick={() => setUppdragData(orderRow('desc'))} className="col-span-2 hover:cursor-pointer">Övrigt</p>
                                {/* <p className="col-span-1">NollK</p> */}
                            </div>
                        </div>
                        {/*  overflow-y-scroll */}
                        <div className="overflow-y-auto h-[82vh]">
                            {}
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
                    </div>)}
            </MainPage>
        </>
    );
};

export default HomePageSkeleton;