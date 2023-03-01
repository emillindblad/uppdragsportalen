import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import MainPage from "../../components/MainPage";

import { useForm } from "react-hook-form";
import { type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ErrorText } from "../../components/ErrorText";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { getServerAuthSession } from "../../server/auth";
import { render } from "react-dom";

export const uppdragCreateSchema = z.object({
    year: z.number().min(4),
    nollk: z.string().min(2),
    title: z.string().min(1,{message: 'Vänligen ange en titel på ditt uppdrag'}),
    place: z.string().min(1,{message: 'Vänligen ange plats för uppdraget'}),
    time: z.string().min(1,{message: 'Vänligen ange den tid uppdraget kommer ske'}),
    participants: z.number().min(1,{ message: 'Vänligen ange antal deltagare' }),
    desc: z.string().min(1,{message: 'Vänligen ange en beskrivning av uppdraget'}),
    motivation: z.string().min(1, { message: 'Vänligen ange en motviation till uppdraget' }),
    private: z.boolean()
});

type FormSchemaType = z.infer<typeof uppdragCreateSchema>;

export const getServerSideProps: GetServerSideProps = async ( ctx ) => {
    const session = await getServerAuthSession(ctx);
    return {
        props: { session },
    }
}

const NewUppdrag: NextPage = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const utils = api.useContext();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormSchemaType>({
        resolver: zodResolver(uppdragCreateSchema),
        defaultValues: {
            year: session?.user.year as number,
            nollk: session?.user.nollk as string,
        }
    });

    const createUppdrag = api.uppdrag.create.useMutation({
        onSettled: async () => {
            await utils.uppdrag.invalidate();
            reset()
        }
    });

    const submitSubmit: SubmitHandler<FormSchemaType> = (data) => {
        console.log("form data",data)
        createUppdrag.mutate(data)
        void router.push('/home');
    };

    const submitDraft: SubmitHandler<FormSchemaType> = (data) => {
        // TODO Draft submission
        console.log(data)
        render(<p>Hej</p>,document.getElementById('__next'))
    };


    return (
        <MainPage title={"Nytt uppdrag"}>
            <div className="flex flex-col h-full justify-between pt-6">
                <div className="border-b-2 border-black pb-2 mb-6">
                    <h1 className="text-4xl text-left text-black font-bold">Skapa nytt uppdrag</h1>
                </div>
                <div className="max-w-[75%] h-full">
                    <form className="flex flex-col justify-between h-full" >
                        <div>
                            <div>
                                <input
                                    id="assignmentTitle"
                                    type="text"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Titel"
                                    {...register('title')} />
                                {errors.title?.message && <ErrorText text={errors.title?.message}/>}
                            </div>
                            <div className="flex items-stretch mt-6 gap-4">
                                <div className="w-full">
                                    <input
                                        id="assignmentPlace"
                                        type="text"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Plats"
                                        {...register('place')}
                                    />
                                    {errors.place?.message && <ErrorText text={errors.place?.message}/>}
                                </div>
                                <div className="w-full">
                                    <input
                                        id="assignmentTime"
                                        type="text"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Tid"
                                        {...register('time')}
                                    />
                                    {errors.time?.message && <ErrorText text={errors.time?.message}/>}
                                </div>
                                <div className="w-full">
                                    <input
                                        type="number"
                                        id="assignmentParticipants"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Antal deltagare"
                                        {...register('participants', { valueAsNumber: true })}
                                    />
                                    {errors.participants?.message && <ErrorText text={errors.participants?.message}/>}
                                </div>
                            </div>
                            <textarea
                                id="assignmentDesc"
                                className="mt-6 block h-[15vh] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Beskrivning"
                                {...register('desc')}
                            />
                            {errors.desc?.message && <ErrorText text={errors.desc?.message}/>}
                            <textarea
                                id="assignmentMotivation"
                                //className="mt-6 h-[15vh] w-full flex-1 rounded-2xl block p-3.5 text-xl bg-white border border-gray-300 focus:ring-mk-blue focus:border-mk-blue resize-none"
                                className="mt-6 block h-[15vh] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Motivering"
                                {...register('motivation')}
                            />
                            {errors.motivation?.message && <ErrorText text={errors.motivation?.message}/>}
                            <div className="mt-6">
                                <input
                                    id="privpub"
                                    className="h-4 w-4 rounded border-gray-300 text-mk-blue focus:ring-mk-blue"
                                    type="checkbox"
                                    placeholder="Privat/Publikt"
                                    {...register('private')}
                                />
                                {errors.private?.message && <ErrorText text={errors.private?.message}/>}
                                <label htmlFor="privpub" className="ml-3 select-none text-l text-gray-600">Privat/Publikt</label>
                            </div>
                        </div>
                        <div className="flex justify-between mt-6 mb-4">
                            <div className="">
                                <Link href="/home">
                                    <button className="bg-mk-yellow hover:bg-mk-yellow-hover text-white text-lg rounded-2xl font-bold px-6 py-2" type="button">Tillbaka</button>
                                </Link>
                                <Link href="/home" className="px-2">
                                    <button
                                        className="bg-mk-blue hover:bg-mk-blue-hover text-white text-lg rounded-2xl font-bold px-6 py-2"
                                        type="button"
                                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                                        onClick={handleSubmit(submitDraft)}
                                    >
                                        Spara
                                    </button>
                                </Link>
                            </div>
                            <div className=" justify-self-end ">
                                <button
                                    className="bg-mk-blue hover:bg-mk-blue-hover text-white text-lg rounded-2xl font-bold px-6 py-2"
                                    type="submit"
                                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                                    onClick={handleSubmit(submitSubmit)}
                                >
                                    Skicka in
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </MainPage>
    );
};

export default NewUppdrag;
