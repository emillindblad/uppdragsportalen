import type { Uppdrag } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import { api } from "../utils/api";

const Lab2Api: NextPage = () => {
    const [uppdragData, setUppdragData] = useState<Uppdrag[] | undefined>();

    const { data, refetch } = api.uppdrag.getUppdrag.useQuery(undefined, {
        refetchOnWindowFocus: false,
        enabled: false
    });

    useEffect(() => {
        setUppdragData(data)
    },[data]);

    const handleClick = () => { void refetch() };

    return (
        <>
            <Head>
                <title>Uppdragsportalen - Mottagningskommittén</title>
            </Head>
            <Navbar/>
            <div className="pt-20 px-8">
                <button onClick={handleClick} className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Hämta uppdrag</button>

                {uppdragData?.map( (uppdrag) => {
                    return (
                        <div className="flex justify-start space-x-8 max-w-screen-2xl border-b-2 border-indigo-400 " key={uppdrag.id}>
                            <p className="flex-initial max-w-[180px]">{uppdrag.nollk}</p>
                            <p className="flex-initial max-w-[140px]">{uppdrag.title}</p>
                            <p className="flex-initial max-w-[180px]">{uppdrag.desc}</p>
                            <p className="flex-initial max-w-[180px]">{uppdrag.place}</p>
                            <p className="flex-initial max-w-[180px]">{uppdrag.time}</p>
                            <p className="flex-initial max-w-[180px]">{uppdrag.participants}</p>
                        </div>
                    )
                    })
                }

            </div>

        </>
    );
};

export default Lab2Api;

