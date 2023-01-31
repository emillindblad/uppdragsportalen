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
                        <div className="flex justify-around" key={uppdrag.id}>
                            <p>{uppdrag.nollk}</p>
                            <p>{uppdrag.title}</p>
                            <p>{uppdrag.desc}</p>
                            <p>{uppdrag.place}</p>
                            <p>{uppdrag.time}</p>
                            <p>{uppdrag.participants}</p>
                        </div>
                    )
                    })
                }

            </div>

        </>
    );
};

export default Lab2Api;

