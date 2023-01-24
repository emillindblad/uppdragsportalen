import { type NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import mkLogo from "../../public/img/mk.jpg"

const Login: NextPage = () => {
    return (
        <>
            <Head>
                <title>Uppdragsportalen - Mottagningskommittén</title>
            </Head>
            <Image src={mkLogo} className="absolute -z-50 h-full w-full blur-[8px]" alt={""} />
            <header className="flex align-middle h-14 py-2 px-4 bg-mk-blue">
                <p className="flex items-center text-white text-xl">Mottagningskommittén</p>
            </header>
            <main className="">
                <div className="bg-white w-fit">
                    <h1 className="text-mk-yellow text-6xl font-bold">Godmorgon gemene teknolog!</h1>
                    <div className="card p-5">
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
