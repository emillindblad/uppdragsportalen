import { type SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, type  FC } from 'react';
import * as z from 'zod';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { ErrorText } from './ErrorText';
import { useRouter } from 'next/router';

const schema = z.object({
    email: z.string().email({message: 'Vänligen skriv in din email'}),
    password: z.string().min(1, { message: 'Vänligen skriv in ditt lösenord' })
});




type FormSchemaType = z.infer<typeof schema>;

const LoginForm: FC = () => {

    const router = useRouter();

    const [errorMessage, setErrorMessage] = useState<string>();


    const { register, handleSubmit, formState: { errors }, } = useForm<FormSchemaType>({ resolver: zodResolver(schema), });
    const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
        const res = await signIn('credentials', {callbackUrl: "/home", email: data.email, password: data.password, redirect: false })

        if (res?.ok) {
            await router.push("/home");
        } else {
            setErrorMessage(res?.error)
        }
    };

    return (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <form className="w-80" onSubmit={handleSubmit(onSubmit)}>
            <div className='text-red-500 my-4 font-bold text-xl'>{errorMessage}</div>
            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700" htmlFor="">Email</label>
                <input required className="w-full mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-sky-500 sm:text-sm" type="email" {...register('email')} />
                {errors.email?.message && <ErrorText text={errors.email?.message}/>}
            </div>

            <div className="mb-4">
                <div className="flex justify-between align-text-bottom">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="">Lösenord</label>
                    <Link className="text-xs leading-5 text-sky-500 hover:cursor-pointer hover:underline" href="/forgot_password">Glömt lösenord?</Link>
                </div>
                <input required className="w-full mt-1 block rounded-md border-gray-300 shadow-sm focus:border-b-mk-blue focus:ring-sky-500 sm:text-sm" type="password" {...register('password')} />
                {errors.password?.message && <ErrorText text={errors.password.message}/>}
            </div>
            <div className="flex flex-col items-center gap-3">
                <input className="w-full inline-flex justify-center rounded-md border border-transparent bg-sky-500 py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 hover:cursor-pointer hover:bg-sky-700" type="submit" value="Logga in" />
                    <Link className="text-xs text-sky-500 hover:cursor-pointer hover:underline" href="/register">Skapa konto</Link>
            </div>
        </form>
    );
};

export default LoginForm;
