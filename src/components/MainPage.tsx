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
            <div>
                <div className="grid grid-cols-4 gap-4 h-screen">
                    <SideMenu/>
                    <div className="col-start-2 col-end-5 m-4 max-w-full">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainPage;