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
                    <div className="col-span-1 bg-mk-blue h-screen mx-4 my-4 rounded-3xl grid grid-rows-4">
                        <div className="grid grid-cols-3 m-7 row-span-1">
                            <a href="login.html" className="col-span-1 ms-2">
                            {/* Hardcoded image values, replace later */}
                            <Image src={placeholderImg} alt="" className="h-[70px] w-[65px]" />
                            </a>
                            <div className="col-span-2 items-center ml-3 mb-0">
                            <p className=" text-white font-bold text-xl tracking-wide">Julia Böckert</p>
                            <p className=" text-white text-lg font-semibold tracking-wide">phadder.nollkit@chalmers.it</p>
                            </div>
                        </div>
                        <div className="grid grid-rows-4 items-center mx-8 row-span-2">
                            <SideButton>
                                Mina nolluppdrag
                            </SideButton>
                            <SideButton>
                                Arkiv
                            </SideButton>
                            <SideButton>
                                Chalmers nolluppdrag
                            </SideButton>
                            <SideButton>
                                Dokument
                            </SideButton>
                        </div>
                        <div className="row-span-1">
                            <button className="bg-mk-yellow text-white">Logga ut</button>
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
