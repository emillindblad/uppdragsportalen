import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import AssignmentData from "../components/AssignmentData";
import MainPage from "../components/MainPage";
import { api } from "../utils/api";
import { useState, useEffect } from "react";
import type { Uppdrag } from "@prisma/client";
import HomePageSkeleton from "../components/homepageSkeleton";

/**
 * Handles the Arkiv-page, i.e. the page displaying all the existing and previous Assigments made by the logged-in user
*/

const Archive: NextPage = () => {
    return (
        <>

         <HomePageSkeleton id={"archive"} title={"Arkiv"}/>

         {/* Använd props både i home och i SideMenu så att beroende på vilken knapp 
         du klickar på så använder du en annan query (getbyNollKAllyears och getbynollk) */}

        </>
    );
}

export default Archive;