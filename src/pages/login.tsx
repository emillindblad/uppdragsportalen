import { type NextPage } from "next"
import Head from "next/head"
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";
import Page from "../components/Page";

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
