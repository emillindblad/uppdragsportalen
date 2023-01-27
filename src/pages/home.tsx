import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link"
import Navbar from "../components/Navbar";
import { Component } from "react";
import Image from "next/image";
import placeholderImg from "../../public/img/logo-new.png"
import SideButton from "../components/SideButton";
import itLogo from "../../public/img/it-logo.png"
import AssignmentData from "../components/AssignmentData";


const Home: NextPage = () => {
    return (
    <>
        <Head>
             <title>Mottagningskommittén</title>
             <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
            <nav className="">
                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1 bg-mk-blue mx-1 my-4 rounded-3xl grid grid-rows-5 h-full">
                        <div className="grid grid-cols-3 m-5 row-span-1 mb-7">
                            <a href="/login" className="col-span-1 ms-2">
                            {/* Hardcoded image values, replace later */}
                            <Image src={itLogo} alt="" className="max-w-[60px]" />
                            </a>
                            <div className="col-span-2 items-center ml-1 mb-0">
                            <p className=" text-white font-bold text-lg tracking-wide">Julia Böckert</p>
                            <p className=" text-white text-s font-semibold tracking-wide">phadder.nollkit@chalmers.it</p>
                            </div>
                        </div>
                        <div className="grid grid-rows-4 items-center mx-8 mt-5 row-span-2">
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

                        <div className="row-span-2 ml-6 mb-4 flex items-end">
                            <a href="login">
                                <button className="bg-mk-yellow hover:bg-mk-yellow-hover text-white text-lg rounded-2xl font-bold px-6 py-2">Logga ut</button>
                            </a>
                        </div>
                    </div>
                    <div className="col-span-3  m-4">
                        <div className="topnav my-4">
                            <div className="search-container shadow rounded-2xl overflow-hidden">
                                <input className="px-4 py-2 w-full h-15 border-white placeholder-[#737373] text-2xl" type="text" placeholder="Sök.." name="search" />
                            </div>
                        </div>
                        {/* <div className="flex flex-col">
                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="overflow-hidden rounded-2xl shadow">
                                        <table className="min-w-full">
                                            <thead className="bg-mk-blue border-b">
                                                <tr className="indent-5 text-2xl text-white text-left">
                                                    <th className="py-2" scope="col">Nolluppdrag</th>
                                                    <th className="py-2" scope="col">Sektion</th>
                                                    <th className="py-2" scope="col">Status</th>
                                                    <th className="py-2" scope="col">Övrigt</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="indent-5 bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                    <td className="py-2">Vasaloppet</td>
                                                    <td className="py-2">ITNollK</td>
                                                    <td className="py-2 text-[#00FF00] font-bold">Godkänd</td>
                                                    <td className="py-2"></td>
                                                </tr>
                                                <tr className="indent-5 bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                    <td className="py-2">Dela ut deo till Data</td>
                                                    <td className="py-2">ITNollK</td>
                                                    <td className="py-2 text-[#FFFF00] font-bold">Under granskning</td>
                                                    <td className="py-2 font-bold">SÅKLART!</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left text-black">
                                <thead className="text-lg text-[#737373] bg-white border-b-2 border-black">
                                    <tr>
                                        <th className="px-6 py-4" scope="col">Nolluppdrag</th>
                                        <th className="px-6 py-4" scope="col">Sektion</th>
                                        <th className="px-6 py-4" scope="col">Status</th>
                                        <th className="px-6 py-4" scope="col">Övrigt</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AssignmentData></AssignmentData>
                                </tbody>
                            </table>
                        </div>
                        <div className="absolute bottom-3 right-3 py-2">
                            <button className="bg-mk-blue hover:bg-sky-900 text-white rounded-full p-3 " type="button">
                                <svg className="fill-white w-6 h-6" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Home;
