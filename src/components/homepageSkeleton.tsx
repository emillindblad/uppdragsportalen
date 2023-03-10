import { useSession } from "next-auth/react";
import Link from "next/link";
import AssignmentData from "./AssignmentData";
import MainPage from "./MainPage";
import { api } from "../utils/api";
import { useState, useEffect} from "react";
import type { Uppdrag } from "@prisma/client";


//om klickar på arkiv, kör den här queryn (varje query får en metod med data/refetch, se labb2)

interface HomeProps { //va1d ska vi ersätta denna med
    title : string,
    id: string
}

// export const getServerSideProps: GetServerSideProps = async ( ctx ) => {
//     const session = await getServerAuthSession(ctx);
//     return {
//         props: { session },
//     }
// }

 export const HomePageSkeleton  = (props: HomeProps) => {

    // Usestate hook for sorting table of Uppdrag
    const [sortStateIndex, setSortStateIndex] = useState<number>(0); // unsorted, ascending, descending
    const [icon, setIcon] = useState<string>("");

    const [uppdragData, setUppdragData] = useState<Uppdrag[] | undefined>();
    const {data: isMK} = api.user.getUserStatus.useQuery();
    const {data: session} = useSession();
    //const uppdragQuery = api.uppdrag.getByNollK.useQuery({nollk: "", enabled:})

    const [searchValue, setSearchValue] = useState("");


    // to track which header is clicked
    const [titleClicked, setTitleClicked] = useState(false);
    const [timeClicked, setTimeClicked] = useState(false);
    const [statusClicked, setStatusClicked] = useState(false);
    const [placeClicked, setPlaceClicked] = useState(false);
    const [nollkClicked, setNollkClicked] = useState(false);

     //methods for deciding which query to run
     const { data : chalmersData, refetch : chalmers } = api.uppdrag.getAll.useQuery(undefined,{
        refetchOnWindowFocus: false,
        enabled: false
    });

    const { data : thisYearData, refetch : myNollk } = api.uppdrag.getByNollKThisYear.useQuery({ year: 2023},{
        enabled: false,
        refetchOnWindowFocus: false,
        });

    const { data : archiveData, refetch : nollKs } = api.uppdrag.getByNollK.useQuery({ nollk: ""},{
        enabled: false,
        refetchOnWindowFocus: false,

    });

    const { data : reviewData, refetch : granska } = api.uppdrag.getAllbyStatus.useQuery({
        status: 'SUBMITTED'
     },{
        refetchOnWindowFocus: false,
        enabled: false
    });

    useEffect(() => {
        if(props.id === "chalmers"){
            void chalmers();
            setUppdragData(chalmersData)
        }
        if(props.id === "archive"){
            void nollKs();
            setUppdragData(archiveData)
        }
        if(props.id === "myAssignments"){
            void myNollk();
            setUppdragData(thisYearData)
        }
        if(props.id === "review") {
            void granska();
            setUppdragData(reviewData)
        }
    },[archiveData, nollKs, chalmers, chalmersData, granska, myNollk, props.id, reviewData, thisYearData, uppdragData]);

    
    /* 
    * Function to sort table by ascending order 
    * (non-case-sensetive)
    */
    function sortByAscending(attribute : string) {
        return function(first : Uppdrag, second : Uppdrag) {
            let firstValue = first[attribute as keyof typeof first];
            let secondValue = second[attribute as keyof typeof second];

            if (typeof firstValue === 'string' && typeof secondValue === 'string') {
                firstValue = firstValue.toLowerCase();
                secondValue = secondValue.toLowerCase();
            }

            if (firstValue === null || secondValue === null) return 0;
            return ( firstValue > secondValue ? 1 : -1)
        }
    }

    /* 
    * Function to sort table by descending order 
    * (non-case-sensetive)
    */
    function sortByDescending(attribute : string) {
        return function(first : Uppdrag, second : Uppdrag) {
            let firstValue = first[attribute as keyof typeof first];
            let secondValue = second[attribute as keyof typeof second];

            if (typeof firstValue === 'string' && typeof secondValue === 'string') {
                firstValue = firstValue.toLowerCase();
                secondValue = secondValue.toLowerCase();
            }

            if (firstValue === null || secondValue === null) return 0;
            return ( firstValue < secondValue ? 1 : -1)
       }
    }

    /*
    * Set data with ascending order
    */
    function ascendingOrder(row : string) {
        setUppdragData(uppdragData?.sort(sortByAscending(row)));
    }

    /*
    * Set data with descending order
    */
    function descendingOrder(row : string) {
        setUppdragData(uppdragData?.sort(sortByDescending(row)));
    }

    /*
    * Function to set resp. state, order and icon by sorting order
    */
    function orderRow(row: string) {
        switch (sortStateIndex) {
            case 0:
                setSortStateIndex(1);
                ascendingOrder(row);
                setIcon('↓');
                break;
            case 1:
                setSortStateIndex(-1);
                descendingOrder(row);
                setIcon('↑');
                break;
            case -1:
                setSortStateIndex(0);
                setIcon('');
                if (uppdragData != null) setUppdragData([...uppdragData])
                    else setUppdragData(undefined)
                break;
            default:
                console.error(`Illegal value of sortStateIndex: ${sortStateIndex}`)
        }
        return;
    }



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
                                <p onClick={() => {orderRow('title'); setTitleClicked(true); setTimeClicked(false); setStatusClicked(false); setPlaceClicked(false); setNollkClicked(false);}} className="flex col-span-1 ml-4 mb-2 hover:cursor-pointer select-none">Namn på uppdrag {titleClicked ? icon : ''}</p>
                                <p onClick={() => {orderRow('place'); setTitleClicked(false); setTimeClicked(false); setStatusClicked(false); setPlaceClicked(true); setNollkClicked(false);}} className="col-span-1 hover:cursor-pointer select-none">Plats {placeClicked ? icon : ''}</p>
                                {isMK ? <p onClick={() => {orderRow('nollk'); setTitleClicked(false); setTimeClicked(false); setStatusClicked(false); setPlaceClicked(false); setNollkClicked(true);}} className="col-span-1 hover:cursor-pointer select-none">NollK {nollkClicked ? icon : ''}</p>
                                      : (<>
                                            <p onClick={() => {orderRow('time'); setTitleClicked(false); setTimeClicked(true); setStatusClicked(false); setPlaceClicked(false); setNollkClicked(false);}} className="col-span-1 hover:cursor-pointer select-none">Tid {timeClicked ? icon : ''}</p>
                                            <p className="col-span-1 hover:cursor-pointer select-none">Privat </p>
                                      </>)
                                }
                                <p onClick={() => {orderRow('status'); setTitleClicked(false); setTimeClicked(false); setStatusClicked(true); setPlaceClicked(false); setNollkClicked(false);}} className="col-span-1 hover:cursor-pointer select-none">Status {statusClicked ? icon : ''}</p>
                            </div>
                        </div>
                        {/*  overflow-y-scroll */}
                        {isMK ?
                                <div className="overflow-y-auto h-[82vh]">
                                    {uppdragData ? <AssignmentData data={uppdragData.filter(u => u.title.includes(searchValue)
                                                                                            || u.nollk.includes(searchValue)
                                                                                            // || u.status.includes(searchValue)
                                                                                            || u.place.includes(searchValue))}/>
                                    : <p>Loading...</p> }
                                </div>
                            :
                                <div className="overflow-y-auto h-[82vh]">
                                    {uppdragData ? <AssignmentData data={uppdragData.filter(u => u.title.includes(searchValue)
                                                                                            || u.time.includes(searchValue)
                                                                                            // || u.status.includes(searchValue)
                                                                                            // || u.private.tosting().includes(searchValue)
                                                                                            || u.place.includes(searchValue))}/>
                                    : <p>Loading...</p> }
                                </div>

                        }
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
