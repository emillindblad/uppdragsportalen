import { NextPage } from "next";
import MainPage from "../components/MainPage";
import Image from "next/image";
import dataLogo from "../../public/img/dnollk.png";
import { Uppdrag } from "@prisma/client";
import { api } from "../utils/api";
import { useEffect, useState } from "react";

interface MainPageProps {
    title: React.ReactNode,
    children: React.ReactNode,
}


const NewAssignment: NextPage = () => {
    {/* Hardcoded for now until we have changed AssignmentData.tsx */}
    const uppdragId = 'cldsnmh590004g1vo4o54uxxa';

    const { data } = api.uppdrag.getOneUppdrag.useQuery({id: uppdragId});


    return (
        <>
            <MainPage title={data?.title}>
                <div className="my-4 relative h-full">
                    <div className="border-b-2 border-black p-2 h-20 flex items-center">
                        <div className="text-4xl font-bold text-left">
                            {data?.title}
                        </div>
                        {/* Hardcoded now, change to author + nollk pic + email */}
                        <div className="flex absolute right-0">
                            <Image src={dataLogo} alt="" className="max-w-[60px] mr-4 mb-2" />
                            <div className="items-start min-w-[150px]">
                                <p className=" text-black font-bold text-lg tracking-wide">Lippo</p>
                                <p className=" text-black text-s font-semibold tracking-wide">nolluppdrag@dnollk.dtek.se</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-left py-6">
                        {data?.desc}                    
                    </div>
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