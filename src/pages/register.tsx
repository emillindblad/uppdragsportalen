import type { NextPage } from 'next';
import Navbar from '../components/Navbar';
import Page from '../components/Page';

import { type SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ErrorText } from '../components/ErrorText';
import { api } from '../utils/api';
import { useRouter } from 'next/router';


/**
 * Handles the page for registering
*/

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
    confirm: z.string().min(1, { message: 'Vänligen bekräfta ditt lösenord!' }),
    nollk: z.string().min(1,{ message: 'Välj vilket NollK du tillhör!' })
}).refine((data) => data.password === data.confirm, {
    message: "Lösenorden matchar inte!",
    path: ["confirm"],
});



type FormSchemaType = z.infer<typeof schema>;

const Register: NextPage = () => {
    const router = useRouter();
    const utils = api.useContext();
    const registerMutation = api.user.registerNewUser.useMutation({
        onSettled: async () => {
            await utils.user.invalidate()
            reset()
        }
    });

    const handleMutation = async (data: { email: string; password: string; fullname: string; nollk: string; }) => {
        await registerMutation.mutateAsync({email: data.email, password: data.password, name: data.fullname, nollk: data.nollk});
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormSchemaType>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
        await handleMutation(data);
        await router.push('/login')
    };


    return (
        <>
            <Navbar></Navbar>
            <Page>
                <div className='m-4'>
                Registreringen går till så att du först fyller i några uppgifter om dig själv, därefter kommer informationen att granskas av MK (för att verifiera att du sitter i årets NollK). När detta är färdigt kan du logga in och utnyttja de tjänster som Uppdragsportalen har att erbjuda.
                </div>
                {/*eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                <form className='m-12' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-row justify-evenly my-4 flex-wrap'>
                        <div className="flex flex-col min-w-[200px] w-[40%] m-2">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="first">För- och efternamn:</label>
                            <input required className="p-4 rounded-lg bg-slate-50 focus:border-indigo-500 border transition-all" placeholder='Namn efternamn' type="text" id="first" {...register('fullname')} />
                            {errors.fullname?.message && <ErrorText text={errors.fullname?.message}/>}
                        </div>
                        <div className='flex flex-col w-[40%] min-w-[200px] m-2'>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="email">E-mail:</label>
                            <input required className="p-4 rounded-lg bg-slate-50 focus:border-indigo-500 border transition-all" placeholder='Email' type="email" id="email" {...register('email')} />
                            {errors.email?.message && <ErrorText text={errors.email?.message}/>}
                        </div>
                        <div className="flex flex-col w-[40%] min-w-[200px] m-2">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="pass">Lösenord:</label>
                            <input required className="p-4 rounded-lg bg-slate-50 focus:border-indigo-500 border transition-all" placeholder='Lösenord' type="password" id="pass" {...register('password')} />
                            {errors.password?.message && <ErrorText text={errors.password?.message}/>}
                        </div>
                        <div className='flex flex-col w-[40%] min-w-[200px] m-2'>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="passconf">Bekräfta Lösenord:</label>
                            <input required className="p-4 rounded-lg bg-slate-50 focus:border-indigo-500 border transition-all" placeholder='Bekräfta lösenord' type="password" id="passconf" {...register('confirm')}  />
                            {errors.confirm?.message && <ErrorText text={errors.confirm?.message}/>}
                        </div>
                        <div className='flex justify-self-start flex-col w-[40%] min-w-[200px] m-2'>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="first">NollK:</label>
                            <select
                                required
                                className="p-2 rounded-lg bg-slate-50 appearance-none focus:border-indigo-500 border transition-all"
                                id="nollk" {...register('nollk')} >
                                {nollkn.map((nollk) => {
                                    return <option key={nollk} value={nollk}>{nollk}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end m-12">
                        <button
                            className='max-w-[200px] bg-mk-yellow hover:bg-sky-900 text-white text-center font-bold text-xl py-5 px-6 rounded-2xl'
                            type="submit">Submit
                        </button>
                    </div>
                </form>
            </Page>
        </>
    )
}

export default Register;
