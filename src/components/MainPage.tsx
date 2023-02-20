import SideMenu from "../components/SideMenu";
import Head from "next/head";
import useIsMK from "../utils/IsMK"

interface MainPageProps {
    title: React.ReactNode,
    children: React.ReactNode,
}


const MainPage = (props: MainPageProps) => {
    const isMK = useIsMK();
    return(
        <>
            <Head>
                <title>{props.title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="px-4 py-4 h-screen">
                <div className="grid grid-cols-5 gap-5 h-full">
                    <SideMenu isMK={isMK}/>
                    <div className="col-span-4 max-w-full">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainPage;


