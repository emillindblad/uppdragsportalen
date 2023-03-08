import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import AssignmentData from "../components/AssignmentData";
import MainPage from "../components/MainPage";
import { api } from "../utils/api";
import { useState, useEffect } from "react";
import type { Uppdrag } from "@prisma/client";
import HomePageSkeleton from "../components/homepageSkeleton";

const Assignments: NextPage = () => {
    return (
        <>

         <HomePageSkeleton uppdrag="arkiv" query={api.uppdrag.getByNollK.useQuery({nollk: ""})} title={"Arkiv"}/>

         {/* Använd props både i home och i SideMenu så att beroende på vilken knapp 
         du klickar på så använder du en annan query (getbyNollKAllyears och getbynollk) */}

        </>
    );
}

export default Assignments;