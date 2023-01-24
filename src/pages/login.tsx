import { type NextPage } from "next"
import Head from "next/head"
import Navbar from "../components/Navbar";

const Login: NextPage = () => {
    return (
        <>
            <Head>
                <title>Uppdragsportalen - Mottagningskommittén</title>
            </Head>
            <main className="flex flex-col min-h-screen items-center bg-mk-bg bg-no-repeat bg-cover">
                <Navbar/>
                <div className="container flex flex-col items-center w-fit">
                    <h1 className="text-mk-yellow text-6xl font-bold m-3 drop-shadow-2xl">Godmorgon gemene teknolog!</h1>
                    <div className="bg-white p-5">
                        <form>
                            <label className="fw-bold" >Email:</label>
                            <input className="form-control form-control-lg bg-primary text-white" type="text" id="mail" placeholder="name@example.com" name="mail"/>
                            <div className="d-flex justify-content-between">
                                <label className="fw-bold" >Lösenord:</label>
                                <label className="text-secondary">Glömt lösenordet?</label>
                            </div>
                            <input className="form-control form-control-lg bg-primary text-white" type="text" id="passw" placeholder="lösenord" name="passw"/>
                            <button type="submit" className="form-control btn bg-secondary" formAction="index.html">Logga in</button>
                            <a className="float-right" href="register.html">Registrera dig</a>
                            <label className="me-1 float-right">Inget konto?</label>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Login;
