import { NextPage } from "next";
import React from "react";
import MainPage from "../components/MainPage";

const Accounts: NextPage = () => {
    return (
        <>
            <MainPage title={"Konton"}>
                <h1 className="text-center text-2xl">TJENA TJENA HÄR BLIR DET KONTON</h1>
                <p>Här ville jag bara testa så mina knappar funkade tjolahopp</p>
            </MainPage>
        </>
        );
    };

    export default Accounts;