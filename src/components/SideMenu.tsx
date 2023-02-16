import SideButton from "../components/SideButton";
import Image from "next/image";
import itLogo from "../../public/img/it-logo.png";
import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react";

interface MenuProps {
    isMK : boolean
};

const SideMenu = (
    props: MenuProps
) => {
    const [activeButtonIndex, setActiveButtonIndex] = useState(0);

//TODO En check på vilken sida man är inne på (kan typ också va en hook) och setActiveButtonIndex därefter
//hook useLocation
    return (
        <>
        <nav className="col-span-1 bg-mk-blue my-auto rounded-3xl grid grid-rows-5 h-full min-w-[300px]">
            <div className="flex m-5 row-span-1 mb-7 flex-wrap">
                <Link href="/login" className="col-span-1 ms-2">
                {/* Hardcoded image values, replace later */}
                <Image src={itLogo} alt="" className="max-w-[60px] mr-4 mb-2" />
                </Link>
                <div className="items-start min-w-[150px]">
                <p className=" text-white font-bold text-lg tracking-wide">Julia Böckert</p>
                <p className=" text-white text-s font-semibold tracking-wide">phadder.nollkit@chalmers.it</p>
                </div>
            </div>

            <div className="grid grid-rows-4 items-center mx-8 mt-5 row-span-2">
                {props.isMK ?
                    (<SideButton link={'home'}>
                        Granska
                    </SideButton>) :
                    (<SideButton link={'home'}>
                        Mina nolluppdrag
                    </SideButton>)
                }
                {props.isMK ?
                (<SideButton link={'accounts'}>
                    Konton
                </SideButton >) :
                (<SideButton link={'accounts'}>
                Arkiv
                 </SideButton>)
                }
                <SideButton link={'login'}>
                    Chalmers nolluppdrag
                </SideButton>
                <SideButton link={'index'}>
                    Dokument
                </SideButton>
            </div>

            <div className="row-span-2 ml-6 mb-4 flex items-end">
                <a href="login">
                    <button onClick={() => signOut()} className="w-[125px] h-[44px] bg-mk-yellow hover:bg-mk-yellow-hover text-white text-lg rounded-2xl font-bold px-6 py-2">Logga ut</button>
                </a>
            </div>
        </nav>
        </>
    );
};

export default SideMenu;


//Gamla knappens utseende
{/* <SideButton link={'home'} onClick={() => setActiveButtonIndex(2)} hoverColor={(activeButtonIndex === 2 ? "bg-mk-blue-select hover:bg-mk-blue-select" : "bg-mk-blue hover:bg-mk-blue-hover")}>
                    Chalmers nolluppdrag
                </SideButton> */}
