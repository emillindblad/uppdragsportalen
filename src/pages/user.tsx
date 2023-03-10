import { type NextPage } from "next";
import MainPage from "../components/MainPage";
import { type SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ErrorText } from "../components/ErrorText";
import { signOut, useSession } from "next-auth/react";
import { api } from "../utils/api";
import { useEffect } from "react";

const schema = z.object({
    fullname: z.string().min(3, { message: 'Vänligen skriv in ditt för och efternamn!' }),
    email: z.string().email({ message: 'Vänligen skriv in din email!' }),
    password: z.string().min(1, { message: 'Vänligen skriv in ditt lösenord!' }).optional().or(z.literal('')),
    confirm: z.string().min(1, { message: 'Vänligen bekräfta in ditt lösenord!' }).optional().or(z.literal('')),
}).refine((data) => data.password === data.confirm, {
    message: "Lösenorden matchar inte!",
    path: ["confirm"],
});



type FormSchemaType = z.infer<typeof schema>;

/**
 * Handles the User-page, where you can change your user-information
*/
const User: NextPage = () => {
    const { data: session } = useSession();
    const {data: user, refetch: refetchInfo} = api.user.getUser.useQuery({ id: session?.user?.id as string });
    const utils = api.useContext();

    const nameMut = api.user.updateNameEmail.useMutation({
        onSettled: async () => {
            await utils.user.invalidate();
            reset()
            await refetchInfo();
            // currently a hack since session cannot be updated client-side
            await signOut()
        }
    });
    const passMut = api.user.updateAllInfo.useMutation({
        onSettled: async () => {
            await utils.user.invalidate();
            reset()
            await refetchInfo();
            // currently a hack since session cannot be updated client-side
            await signOut()
        }
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormSchemaType>({ resolver: zodResolver(schema), });

    useEffect(() => {
        const defaultValues: FormSchemaType = {
            fullname: session?.user.name as string,
            email: session?.user.email as string,
        }
        reset({...defaultValues})
    }, [reset, session?.user.name, session?.user.email]);

    const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
        if (!(data.password && data.confirm)) {
            nameMut.mutate({ id: session?.user?.id as string, name: data.fullname, email: data.email });
        } else {
            passMut.mutate({ id: session?.user?.id as string, name: data.fullname, email: data.email, password: data.password });
        }

    };

    return (
        <>
            <MainPage session={session} title={"Mottagningskommittén"}>
                <div className="m-12">
                    <h1 className="my-2 text-mk-blue text-6xl font-bold drop-shadow-lg">Hej {user?.name}!</h1>
                    <p className="text-2xl">Om du vill ändra dina uppgifter kan du göra det här!</p>
                </div>
                {/*eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                <form className='my-20' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-row justify-evenly my-12 flex-wrap'>
                        <div className="flex flex-col min-w-[200px] w-[40%] my-12">
                            <label className="text-l" htmlFor="first">För- och efternamn:</label>
                            <input
                                className="p-4 rounded-lg bg-slate-50 focus:border-red-400 border transition-all"
                                placeholder='För- och efternamn'
                                type="text"
                                id="first"
                                {...register('fullname')}
                            />
                            {errors.fullname?.message && <ErrorText text={errors.fullname?.message} />}
                        </div>
                        <div className='flex flex-col w-[40%] min-w-[200px] my-12'>
                            <label className="text-l" htmlFor="email">E-mail:</label>
                            <input required
                                className="p-4 rounded-lg bg-slate-50 focus:border-red-400 border transition-all"
                                placeholder='Email' type="email" id="email"
                                {...register('email')}
                            />
                            {errors.email?.message && <ErrorText text={errors.email?.message} />}
                        </div>
                        <div className="flex flex-col w-[40%] min-w-[200px] my-12">
                            <label className="text-l" htmlFor="pass">Lösenord:</label>
                            <input
                                className="p-4 rounded-lg bg-slate-50 focus:border-red-400 border transition-all"
                                placeholder='Lösenord'
                                type="password"
                                id="pass"
                                {...register('password')}
                            />
                            {errors.password?.message && <ErrorText text={errors.password?.message} />}
                        </div>
                        <div className='flex flex-col w-[40%] min-w-[200px] my-12'>
                            <label className="text-l" htmlFor="passconf">Bekräfta Lösenord:</label>
                            <input
                                className="p-4 rounded-lg bg-slate-50 focus:border-red-400 border transition-all"
                                placeholder='Bekräfta lösenord'
                                type="password"
                                id="passconf"
                                {...register('confirm')}
                            />
                            {errors.confirm?.message && <ErrorText text={errors.confirm?.message} />}
                        </div>
                    </div>
                    <div className="flex justify-end m-12">
                        <button
                            className='max-w-[200px] bg-mk-yellow hover:bg-sky-900 text-white text-center font-bold text-xl py-5 px-6 rounded-2xl'
                            type="submit">Submit
                        </button>
                    </div>
                </form>

            </MainPage>
        </>
    );
};

export default User;
