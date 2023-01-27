import { type NextPage } from "next"
import Head from "next/head"
import Link from "next/link";
import { LoginForm } from "../components/LoginForm";
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
                        {/*
                        <form>
                            <label className="fw-bold" >Email:</label>
                            <input className="form-control form-control-lg bg-primary text-white" type="text" id="mail" placeholder="name@example.com" name="mail"/>
                            <div className="d-flex justify-content-between">
                                <label className="fw-bold" >Lösenord:</label>
                                <label className="text-secondary">Glömt lösenordet?</label>
                            </div>
                            <input className="form-control form-control-lg bg-primary text-white" type="text" id="passw" placeholder="lösenord" name="passw"/>
                            <button type="submit" className="form-control btn bg-secondary">Logga in</button>
                            <Link className="float-right" href="/register">Registrera dig</Link>
                            <label className="me-1 float-right">Inget konto?</label>
                        </form>
                        */}
                </div>
            </Page>
        </>
    );
};

export default Login;
