import SideMenu from "../components/SideMenu";
import Head from "next/head";

interface MainPageProps {
    title: React.ReactNode,
    children: React.ReactNode,
}

const MainPage = (props: MainPageProps) => {
    return(
        <>
            <Head>
                <title>{props.title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="px-7 py-4 h-screen">
                <div className="grid grid-cols-5 gap-5 h-full">
                    <SideMenu/>
                    <div className="col-span-4 max-w-full">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainPage;
