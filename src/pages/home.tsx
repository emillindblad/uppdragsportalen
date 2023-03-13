import type { GetServerSideProps, NextPage } from "next";
import { getServerAuthSession } from "../server/auth";

import HomePageSkeleton from "../components/homepageSkeleton";

export const getServerSideProps: GetServerSideProps = async ( ctx ) => {
    const session = await getServerAuthSession(ctx);
    return {
        props: { session },
    }
}

/**
 * Handles the Mina Uppdrag-page, i.e. the home-page for a NollK-user, displaying this year's assignments made by that user
*/

const Home: NextPage = () => {

    return(
        <>

    <HomePageSkeleton id={"myAssignments"} title={"Mina Uppdrag"}/>
    </>
    );
}
export default Home;