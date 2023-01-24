import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type  FC } from 'react';
import * as z from 'zod';

const schema = z.object({
    email: z.string().email({message: 'Required'}),
    password: z.string().min(1, { message: 'Required' })
});

type FormSchemaType = z.infer<typeof schema>;

const LoginForm: FC = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm<FormSchemaType>({ resolver: zodResolver(schema), });

    return (
        <form className="p-6" onSubmit={handleSubmit((d) => console.log(d))}>
            <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="">E-Mail</label>
                <input className="appearance-none mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" type="text" {...register('email')} />
                {errors.email?.message && <span>{errors.email?.message}</span>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="">Lösenord</label>
                <input className="appearance-none mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" type="password" {...register('password')} /><br/>
                {errors.password?.message && <p>{errors.password?.message}</p>}
            </div>
            <input type="submit" value="Logga in" className="inline-flex justify-center rounded-md border border-transparent bg-mk-yellow py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" />
        </form>
    );
};

export default LoginForm;
