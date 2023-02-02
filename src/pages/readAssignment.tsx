import { NextPage } from "next";
import MainPage from "../components/MainPage";
import Image from "next/image";
import itLogo from "../../public/img/it-logo.png";
import { Uppdrag } from "@prisma/client";
import { api } from "../utils/api";
import { useEffect, useState } from "react";
import { prisma } from "../../src/server/db";

interface MainPageProps {
    title: React.ReactNode,
    children: React.ReactNode,
}

const NewAssignment: NextPage = () => {
    const [uppdragData, setUppdragData] = useState<Uppdrag[] | undefined>();

    const { data, refetch } = api.uppdrag.getAllUppdrag.useQuery(undefined, {
        refetchOnWindowFocus: false,
        enabled: false
    });

    useEffect(() => {
        setUppdragData(data)
    },[data]);

    void refetch();
    

    return (
        <>
            <MainPage title={"Titel"}>
                <div className="my-4 relative h-full">
                    <div className="border-b-2 border-black p-2 h-20 flex items-center">
                        {uppdragData?.map( (uppdrag) => {
                            return (uppdrag.nollk
                                )
                            })
                        }
                        {/* Hardcoded now, change to author + nollk pic + email */}
                        <div className="flex absolute right-0">
                            <Image src={itLogo} alt="" className="max-w-[60px] mr-4 mb-2" />
                            <div className="items-start min-w-[150px]">
                                <p className=" text-black font-bold text-lg tracking-wide">Escape</p>
                                <p className=" text-black text-s font-semibold tracking-wide">uppdrag.nollkit@chalmers.it</p>
                            </div>
                        </div>
                    </div>
                    {uppdragData?.map( (uppdrag) => {
                            return (
                                <div className="mt-6">
                                    {uppdrag.nollk}
                                </div>
                                )
                            })
                        }
                </div>
                <div className="relative bottom-10">
                    <div className="absolute bottom-3 left-0 py-2">
                        <a href="home">
                            <button className="bg-mk-yellow hover:bg-mk-yellow-hover text-white text-lg rounded-2xl font-bold px-6 py-2" type="button">Tillbaka</button>
                        </a>
                    </div>
                </div>
            </MainPage>
        </>
    );
};

export default NewAssignment;