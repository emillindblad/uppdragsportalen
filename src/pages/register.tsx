import { NextPage } from 'next';
import Navbar from '../components/Navbar';
import Page from '../components/Page';

const nollkn = [
    "AØK",
    "ÆØK",
    "bØf",
    "DNollK",
    "EØK",
    "FNollK",
    "GØS",
    "HØK",
    "INollK",
    "KØK",
    "MNollK",
    "NollKIT",
    "SJØK",
    "TBK",
    "TDnollK",
    "VØK",
    "ZØK"
]   



const Register: NextPage = () => {
    return (
        <>
            <Navbar></Navbar>
            <Page>
                <form className='m-12' action="/api/register" method="post">
                    <div className='flex flex-row justify-evenly my-4 flex-wrap'>
                        <div className="flex flex-col min-w-[200px] w-[40%] m-2">
                            <label className="text-l" htmlFor="first">För- och efternamn:</label>
                            <input className="p-4 rounded-lg bg-slate-50 focus:border-red-400 focus:border transition-all" placeholder='Namn efternamn' type="text" id="first" name="first" />
                        </div>
                        <div className='flex flex-col w-[40%] min-w-[200px] m-2'>
                            <label className="text-l" htmlFor="email">E-mail:</label>
                            <input className="p-4 rounded-lg bg-slate-50 focus:border-red-400 focus:border transition-all" placeholder='Email' type="email" id="email" name="email" />
                        </div>
                        <div className="flex flex-col w-[40%] min-w-[200px] m-2">
                            <label className="text-l" htmlFor="pass">Lösenord:</label>
                            <input className="p-4 rounded-lg bg-slate-50 focus:border-red-400 focus:border transition-all" placeholder='Lösenord' type="password" id="pass" name="pass" />
                        </div>
                        <div className='flex flex-col w-[40%] min-w-[200px] m-2'>
                            <label className="text-l" htmlFor="passconf">E-mail:</label>
                            <input className="p-4 rounded-lg bg-slate-50 focus:border-red-400 focus:border transition-all" placeholder='Bekräfta lösenord' type="password" id="passconf" name="passconf" />
                        </div>
                        <div className='flex justify-self-start flex-col w-[40%] min-w-[200px] m-2'>
                            <label className="text-l" htmlFor="first">NollK:</label>
                            <select className="p-4 rounded-lg bg-slate-50 focus:border-red-400 focus:border transition-all"  id="nollk" name="nollk">
                                {nollkn.map((nollk) => {
                                    return <option value={nollk}>{nollk}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className='flex justify-end  m-12'>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </Page>

        </>
    )
}

export default Register;
