import SideMenu from "../components/SideMenu";
import Head from "next/head";
import type { Session } from "next-auth/core/types";

interface MainPageProps {
    title: React.ReactNode,
    session: Session | null,
    children: React.ReactNode,
}


const MainPage = (props: MainPageProps) => {
    return(
        <>
            <Head>
                <title>{props.title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="px-4 py-4">
                <div className="grid grid-cols-5 gap-5 h-[96vh]">
                    <SideMenu session={props.session}/>
                    <div className="col-span-4 max-w-full">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainPage;


