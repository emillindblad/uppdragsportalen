import { type SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type  FC } from 'react';
import * as z from 'zod';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { ErrorText } from './ErrorText';

const schema = z.object({
    email: z.string().email({message: 'Vänligen skriv in din email'}),
    password: z.string().min(1, { message: 'Vänligen skriv in ditt lösenord' })
});




type FormSchemaType = z.infer<typeof schema>;

const LoginForm: FC = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm<FormSchemaType>({ resolver: zodResolver(schema), });
    const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
        await signIn('credentials', {callbackUrl: "/home", email: data.email, password: data.password })

    };

    return (
        <form className="w-80" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700" htmlFor="">Email</label>
                <input required className="w-full mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-sky-500 sm:text-sm" type="email" {...register('email')} />
                {errors.email?.message && <ErrorText text={errors.email?.message}/>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="">Lösenord</label>
                <input required className="w-full mt-1 block rounded-md border-gray-300 shadow-sm focus:border-b-mk-blue focus:ring-sky-500 sm:text-sm" type="password" {...register('password')} />
                {errors.password?.message && <ErrorText text={errors.password.message}/>}
            </div>
            <div className="flex flex-col items-center gap-3">
                <input className="w-full inline-flex justify-center rounded-md border border-transparent bg-sky-500 py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 hover:cursor-pointer hover:bg-sky-700" type="submit" value="Logga in" />
                <Link className="inline-flex text-xs text-sky-500 hover:cursor-pointer " href="https:lindblad.tech">Glömt lösenord?</Link>
            </div>
        </form>
    );
};

export default LoginForm;

async function getLogin(data: FormSchemaType) {

    const res = await fetch("./api/getLogin",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        )
    res.status === 200 ? console.log('success') : console.log('error')
}


