import SideButton from "../components/SideButton";
import Image from "next/image";
import itLogo from "../../public/img/it-logo.png";

const SideMenu = () => {
    return (
        <>
        <nav className="col-span-1 bg-mk-blue mx-1 my-auto rounded-3xl grid grid-rows-5 h-[95vh] max-w-fit">
            <div className="grid grid-cols-4 m-5 row-span-1 mb-7">
                <a href="/login" className="col-span-1 ms-2">
                {/* Hardcoded image values, replace later */}
                <Image src={itLogo} alt="" className="max-w-[60px]" />
                </a>
                <div className="col-span-3 items-start mb-0">
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
        </nav>
        </>
    );
};

export default SideMenu;