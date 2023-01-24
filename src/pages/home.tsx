import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import placeholderImg from "../../public/img/logo-new.png"

const Home: NextPage = () => {
    return (
        <>
         <Head>
             <title>Mottagningskommittén</title>
             <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
            <nav className="container m-2 h-screen w-screen">
                <div className="row">
                    <div className="col-span-1 bg-primary h-screen">
                        <div className="pb-5 pt-2 row">
                            <a href="login.html" className="col-span-1 ms-2">
                            <img className="foobar-animate h-[40px]" src="img/logo-new.png" />
                            </a>
                            <div className="col-span-2 w-[60%]">
                            <h5 className="text-end text-white">Gemene NollK</h5>
                            <p className="text-end text-white">nollkit@chalmers.it</p>
                            </div>
                        </div>
                        <div className="d-grid gap-2">
                        <button className="btn btn-primary">
                            Nolluppdrag
                        </button>
                        <button className="btn btn-primary">
                            Arkiv
                        </button>
                        <button className="btn btn-primary ">
                            Dokument
                        </button>
                        </div>
                    </div>
                    <div className="col-span-2">
                    <div> 
                        <div className="row">
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
