import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import { api } from "../utils/api";

const Lab2Api: NextPage = () => {
    const [tasks, setTasks] = useState<string | undefined>("");

    const { data, refetch } = api.lab2.getTasks.useQuery(undefined, {
        refetchOnWindowFocus: false,
        enabled: false
    });

    useEffect(() => {
        setTasks(data?.task)
    },[data]);

    const handleClick = () => { void refetch() };

    return (
        <>
            <Head>
                <title>Uppdragsportalen - Mottagningskommittén</title>
            </Head>
            <Navbar/>
            <div className="pt-20 px-8">
                <button onClick={handleClick} className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Get tasks</button>
                <p>{tasks}</p>

            </div>

        </>
    );
};

export default Lab2Api;

