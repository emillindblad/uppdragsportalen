import { type NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { Component } from "react";
import Image from "next/image";
import placeholderImg from "../../public/img/logo-new.png"
import SideButton from "../components/SideButton";

const Home: NextPage = () => {
    return (
        <>
         <Head>
             <title>Mottagningskommittén</title>
             <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
            <nav className="">
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1 bg-mk-blue h-screen">
                        <div className="grid grid-cols-3">
                            <a href="login.html" className="col-span-1 ms-2">
                            <img className="h-[40px]" src="img/logo-new.png" />
                            </a>
                            <div className="col-span-2 w-[60px]">
                            <h5 className="text-end text-white">Gemene NollK</h5>
                            <p className="text-end text-white">nollkit@chalmers.it</p>
                            </div>
                        </div>
                        <div className="grid grid-rows-3 gap-5">
                        <SideButton>
                            Nolluppdrag
                        </SideButton>
                        <SideButton>
                            Arkiv
                        </SideButton>
                        <SideButton>
                            Dokument
                        </SideButton>
                        </div>
                    </div>
                    <div className="col-span-2">
                    <div> 
                        <div className="grid grid-cols-3 gap-1">
                            <div className="col-span-1">
                                Nolluppdrag
                            </div>
                            <div className="col-span-1">
                                Status
                            </div>
                            <div className="col-span-1">
                                Inskickad
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </nav>
        
        </>
    );
};

export default Home;
