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
    const uppdragId = 'cldnd4cbo0000vivomteaqj53';

    const { data } = api.uppdrag.getOneUppdrag.useQuery({id: uppdragId});


    return (
        <>
            <MainPage title={data?.title}>
                <div className="grid grid-cols-6 grid-rows-[100px_minmax(300px,auto)] h-full">
                    <div className="flex col-start-1 col-end-7 row-start-1 row-span-1 border-b-2 border-black p-2 h-20 items-center justify-between">
                        <div className="flex items-start text-4xl font-bold text-left">
                            {data?.title}
                        </div>
                            {/* Hardcoded now, change to author + nollk pic + email */}
                        <div className="flex flex-row-reverse">
                            <Image src={dataLogo} alt="" className="max-w-[60px]" />
                            <div className="mr-4">
                                <p className="text-black font-bold text-lg tracking-wide text-right">Lippo</p>
                                <p className="text-black text-s font-semibold tracking-wide text-right">nolluppdrag@dnollk.dtek.se</p>
                            </div>
                        </div>
                    </div>
                    <div className="row-start-2 col-start-1 col-span-7 text-2xl font-bold text-left px-2">
                        {data?.desc}                    
                    </div>
                    <div className="flex row-start-6 col-start-1 col-span-7 items-end px-2">
                        <textarea id="mkComment" className="mt-6 h-[20vh] w-full flex-1 rounded-2xl block p-3.5 text-2xl bg-white border border-gray-300 focus:ring-mk-blue focus:border-mk-blue resize-none" placeholder="Kommentarer.."></textarea>
                    </div>
                    <div className="flex row-start-7 col-start-1 col-end-7 items-end justify-between pb-4 px-2">
                        <div className="col-start-1 col-span-1">
                            <a href="home">
                                <button className="h-[44px] w-[125px] bg-mk-yellow hover:bg-mk-yellow-hover text-white text-lg rounded-2xl font-bold px-6 py-2" type="button">Tillbaka</button>
                            </a>
                        </div>
                        {/* Only for MK */}
                        <div className="flex col-end-7 col-span-4">
                            <div className="flex justify-between mr-6">
                                <div className="flex items-center mr-6">
                                    <input type="radio" id="neka" value="" name="default-radio" className="w-4 h-4 text-mk-blue bg-gray-100 border-gray-300 focus:ring-mk-blue"/>
                                    <label htmlFor="neka" className="ml-2 text-lg font-bold text-black">Neka</label>
                                </div>
                                <div className="flex items-center mr-6">
                                    <input type="radio" id="retur" value="" name="default-radio" className="w-4 h-4 text-mk-blue bg-gray-100 border-gray-300 focus:ring-mk-blue"/>
                                    <label htmlFor="retur" className="ml-2 text-lg font-bold text-black">Retur</label>
                                </div>
                                <div className="flex items-center mr-6">
                                    <input type="radio" id="ok" value="" name="default-radio" className="w-4 h-4 text-mk-blue bg-gray-100 border-gray-300 focus:ring-mk-blue"/>
                                    <label htmlFor="ok"className="ml-2 text-lg font-bold text-black">Godkänn</label>
                                </div>
                            </div>
                            <div className="flex">
                                <a href="home">
                                    <button className="h-[44px] w-[125px] bg-mk-blue hover:bg-mk-blue-hover text-white text-lg rounded-2xl font-bold px-6 py-2" type="button">Skicka</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </MainPage>
        </>
    );
};

export default NewAssignment;