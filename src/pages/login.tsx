import { type NextPage } from "next"

const Login: NextPage = () => {
    return (
        <>
            <head>
                <title>Mottagningskommittén</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body className="bg-dark h-screen">
                <header className="navbar bg-primary" >
                    <span className="navbar-brand text-white p-2">Mottagningskommittèn</span>
                </header>
                <main>
                    {/* <img src="img/mk.jpg" className="bg-mk" /> */}
                    <div className="container" />
                        <h1 className="p-3 text-center text-secondary fw-bold fs-1">Godmorgon gemene teknolog!</h1>
                        <div className="card p-5">
                            <form />
                                <label className="fw-bold" htmlFor="mail">Email:</label><br />
                                <input className="form-control form-control-lg bg-primary text-white" type="text" id="mail" placeholder="name@example.com" name="mail" /><br />
                                <div className="d-flex justify-content-between">
                                    <label className="fw-bold" htmlFor="passw">Lösenord:</label>
                                    <label className="text-secondary">Glömt lösenordet?</label>
                                </div>
                                <input className="form-control form-control-lg bg-primary text-white" type="text" id="passw" placeholder="lösenord" name="passw" /><br />
                                <button type="submit" className="form-control btn bg-secondary" formAction="index.html">Logga in</button><br />
                                <a className="h-[float:right]" href="register.html">Registrera dig</a>
                                <label className="me-1 h-[float:right]">Inget konto?</label>
                        </div>
                </main>
            </body>
        </>
    );
};

export default Login;
