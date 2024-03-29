import { type NextPage } from "next"
import Head from "next/head"
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";
import Page from "../components/Page";

/**
 * Handles the Login-page, where you start and/or get redirected to if you are not logged-in or authorized
*/

const Login: NextPage = () => {
    return (
        <>
            <Head>
                <title>Uppdragsportalen - Mottagningskommittén</title>
            </Head>
            <Navbar/>
            <Page>
                <div className="h-full p-6 mx-auto container flex flex-col items-center justify-center">
                    <LoginForm/>
                </div>
            </Page>
        </>
    );
};

export default Login;
