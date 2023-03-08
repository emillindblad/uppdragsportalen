import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import AssignmentData from "../components/AssignmentData";
import MainPage from "../components/MainPage";
import { api } from "../utils/api";
import { useState, useEffect } from "react";
import type { Uppdrag } from "@prisma/client";
import HomePageSkeleton from "../components/homepageSkeleton";


const Home: NextPage = () => {
    return(
        <>

    <HomePageSkeleton> </HomePageSkeleton>
    </>
    );
}
export default Home;
