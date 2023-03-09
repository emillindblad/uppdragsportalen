import SideButton from "../components/SideButton";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { api } from "../utils/api";
import type { Session } from "next-auth/core/types";

interface SideMenuProps {
    session?: Session | null,
}

const SideMenu = (props: SideMenuProps) => {
    const { data: isMK } = api.user.getUserStatus.useQuery();
    const session = props.session;
    const nollk = session?.user.nollk;

    const imagePath = "/img/" + (nollk as string) + ".png";

//TODO En check på vilken sida man är inne på (kan typ också va en hook) och setActiveButtonIndex därefter
//hook useLocation
    return (
        <>
            <nav className="col-span-1 bg-mk-blue rounded-3xl min-w-[300px] h-[96vh] flex flex-col justify-between">
                <div className="mt-7">
                    <div className="flex mx-5 mb-7 pb-10 ">
                        <Link href="/login" className="col-span-1 ms-2">
                            {/* Hardcoded image values, replace later */}
                            <Image src={`${imagePath}`} height="60" width="60" alt="NollK logo" className="max-w-[60px] mr-4 mb-2" />
                        </Link>
                        <div className="items-start min-w-[150px]">
                            <p className=" text-white font-bold text-lg tracking-wide">{session?.user?.name}</p>
                            <p className=" text-white text-s font-semibold tracking-wide">{session?.user?.email}</p>
                        </div>
                    </div>
                    <div className="grid grid-rows-4 items-center mx-8 mt-5 row-span-2">
                        {isMK ?
                            (<SideButton link={'review'}>
                                Granska
                            </SideButton>) :
                            (<SideButton link={'home'}>
                                Mina nolluppdrag
                            </SideButton>)
                        }
                        {isMK ?
                            (<SideButton link={'accounts'}>
                                Konton
                            </SideButton >) :
                            (<SideButton link={'archive'}>
                                Arkiv
                            </SideButton>)
                            }
                            <SideButton link={'chalmers'}>
                                Chalmers nolluppdrag
                            </SideButton>
                            <SideButton link={'login'}>
                                Dokument
                            </SideButton>
                        </div>
                    </div>

                <div className="flex items-start mt-6 mb-6 ml-6">
                    <button
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onClick={() => signOut()}
                        className="w-[125px] h-[44px] bg-mk-yellow hover:bg-mk-yellow-hover text-white text-lg rounded-2xl font-bold px-6 py-2"
                    >
                        Logga ut
                    </button>
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
