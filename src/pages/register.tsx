import type { NextPage } from 'next';
import Navbar from '../components/Navbar';
import Page from '../components/Page';
import { ErrorText } from '../components/LoginForm';

import { type SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const nollkn: string[] = [
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

const schema = z.object({
    fullname: z.string().min(3,{message: 'Vänligen skriv in ditt för och efternamn!'}),
    email: z.string().email({message: 'Vänligen skriv in din email!'}),
    password: z.string().min(1, { message: 'Vänligen skriv in ditt lösenord!' }),
    nollk: z.string().min(1,{ message: 'Välj vilket NollK du tillhör!' })
});

type FormSchemaType = z.infer<typeof schema>;

const Register: NextPage = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm<FormSchemaType>({ resolver: zodResolver(schema), });
    const onSubmit: SubmitHandler<FormSchemaType> = data => console.log(data);

    return (
        <>
            <Navbar></Navbar>
            <Page>
                <div className='m-4'>
                Registreringen går till så att du först fyller i några uppgifter om dig själv, därefter kommer informationen att granskas av MK (för att verifiera att du sitter i årets NollK). När detta är färdigt kan du logga in och utnyttja de tjänster som Uppdragsportalen har att erbjuda.
                </div>
                <form className='m-12' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-row justify-evenly my-4 flex-wrap'>
                        <div className="flex flex-col min-w-[200px] w-[40%] m-2">
                            <label className="text-l" htmlFor="first">För- och efternamn:</label>
                            <input required className="p-4 rounded-lg bg-slate-50 focus:border-red-400 border transition-all" placeholder='Namn efternamn' type="text" id="first" {...register('fullname')} />
                            {errors.fullname?.message && <ErrorText text={errors.fullname?.message}/>}
                        </div>
                        <div className='flex flex-col w-[40%] min-w-[200px] m-2'>
                            <label className="text-l" htmlFor="email">E-mail:</label>
                            <input required className="p-4 rounded-lg bg-slate-50 focus:border-red-400 border transition-all" placeholder='Email' type="email" id="email" {...register('email')} />
                            {errors.email?.message && <ErrorText text={errors.email?.message}/>}
                        </div>
                        <div className="flex flex-col w-[40%] min-w-[200px] m-2">
                            <label className="text-l" htmlFor="pass">Lösenord:</label>
                            <input required className="p-4 rounded-lg bg-slate-50 focus:border-red-400 border transition-all" placeholder='Lösenord' type="password" id="pass" {...register('password')} />
                            {errors.password?.message && <ErrorText text={errors.password?.message}/>}
                        </div>
                        <div className='flex flex-col w-[40%] min-w-[200px] m-2'>
                            <label className="text-l" htmlFor="passconf">Bekräfta Lösenord:</label>
                            <input required className="p-4 rounded-lg bg-slate-50 focus:border-red-400 border transition-all" placeholder='Bekräfta lösenord' type="password" id="passconf" {...register('password')}  />
                            {errors.password?.message && <ErrorText text={errors.password?.message}/>}
                        </div>
                        <div className='flex justify-self-start flex-col w-[40%] min-w-[200px] m-2'>
                            <label className="text-l" htmlFor="first">NollK:</label>
                            <select required className="p-2 rounded-lg bg-slate-50 appearance-none focus:border-red-400 border transition-all"  id="nollk" {...register('nollk')} >
                                {nollkn.map((nollk) => {
                                    return <option value={nollk}>{nollk}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end m-12">
                        <div className='max-w-[200px] bg-mk-yellow hover:bg-sky-900 text-white text-center font-bold text-xl py-5 px-6 rounded-2xl'>
                            <button className='text-white' type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </Page>
        </>
    )
}

export default Register;
