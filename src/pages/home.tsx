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
                    <div className="col-4 bg-primary h-screen">
                        <div className="pb-5 pt-2 row">
                            <a href="login.html" className="col-4 ms-2">
                                <Image className="foobar-animate h-[40px]" width="40" src={placeholderImg} alt="" />
                            </a>
                            <div className="col-8 w-[60%]">
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
                    <div className="col-8">
                        <div>
                            <div className="row">
                                <div className="col-4">
                                    Nolluppdrag
                                </div>
                                <div className="col-4">
                                    Status
                                </div>
                                <div className="col-4">
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
