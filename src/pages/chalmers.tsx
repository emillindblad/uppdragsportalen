import { GetServerSideProps, type NextPage } from "next";
import Link from "next/link";
import AssignmentData from "../components/AssignmentData";
import MainPage from "../components/MainPage";
import { api } from "../utils/api";
import { useState, useEffect } from "react";
import type { Uppdrag } from "@prisma/client";
import { getServerAuthSession } from "../server/auth";
import { useSession } from "next-auth/react";
import HomePageSkeleton from "../components/homepageSkeleton";

export const getServerSideProps: GetServerSideProps = async ( ctx ) => {
    const session = await getServerAuthSession(ctx);
    return {
        props: { session },
    }
}

/**
 * Handles the Chalmers nolluppdrag-page, i.e. the page displaying every single previous and new assignment by every user
*/

const Chalmers: NextPage = () => {

    return(
        <>

    <HomePageSkeleton id={"chalmers"} title={"Chalmers uppdrag"}/>
    </>
    );
}
export default Chalmers;