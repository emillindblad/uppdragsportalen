import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import AssignmentData from "../components/AssignmentData";
import MainPage from "../components/MainPage";
import { api } from "../utils/api";
import { useState, useEffect } from "react";
import type { Uppdrag } from "@prisma/client";

const Assignments: NextPage = () => {
    return (
        <>
         <MainPage title="chalmersUppdrag">

         <h1> hej</h1>

         {/* Använd props både i home och i SideMenu så att beroende på vilken knapp 
         du klickar på så använder du en annan query (getbyNollKAllyears och getbynollk) */}





         </MainPage>
        </>
    );
}

export default Assignments;