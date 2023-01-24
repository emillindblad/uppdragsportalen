import { type NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import mkLogo from "../../public/img/mk.jpg"

const Login: NextPage = () => {
    return (
        <>
            <Head>
                <title>Mottagningskommiten</title>
            </Head>
            <header className="navbar bg-mk-blue">
                <span className="navbar-brand text-white p-2">Mottagningskommittèn</span>
            </header>
            <main>
                <Image src={mkLogo} className="bg-mk" alt={""} />
                <div className="container">
                    <h1 className="p-3 text-center text-secondary fw-bold fs-1">Godmorgon gemene teknolog!</h1>
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
