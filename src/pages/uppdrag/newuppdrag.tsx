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
    const createUppdrag = api.uppdrag.create.useMutation({
        onSettled: async () => {
            await utils.uppdrag.invalidate();
            reset()
        }
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormSchemaType>({
        resolver: zodResolver(uppdragCreateSchema),
        defaultValues: {
            year: session?.user.year as number,
            nollk: session?.user.nollk as string,
        }
    });

    const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
        console.log("form data",data)
        createUppdrag.mutate(data)
        void router.push('/home');
    };

    return (
            <MainPage title={"Nytt uppdrag"}>
                <div className="border-b-2 border-black p-2 my-4">
                    <h1 className="text-4xl text-left text-black font-bold">Skapa nytt uppdrag</h1>
                </div>
                <div className="max-w-[75%] min-w-[50%]">
                    {/* eslint-disable-next-line @typescript-eslint/no-misused-promises*/}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input id="assignmentTitle" className="rounded-2xl w-full block p-3.5 text-xl bg-white border border-gray-300 focus:ring-mk-blue focus:border-mk-blue resize-none" placeholder="Titel" {...register('title')} />
                        {errors.title?.message && <ErrorText text={errors.title?.message}/>}
                        <div className="flex mt-6 gap-4">
                            <input
                                id="assignmentPlace"
                                className="rounded-2xl w-full block p-3.5 text-xl bg-white border border-gray-300 focus:ring-mk-blue focus:border-mk-blue resize-none"
                                placeholder="Plats"
                                {...register('place')}
                            />
                            {errors.place?.message && <ErrorText text={errors.place?.message}/>}
                            <input
                                id="assignmentTime"
                                className="rounded-2xl w-full block p-3.5 text-xl bg-white border border-gray-300 focus:ring-mk-blue focus:border-mk-blue resize-none"
                                placeholder="Tid"
                                {...register('time')}
                            />
                            {errors.time?.message && <ErrorText text={errors.time?.message}/>}
                            <input
                                type="number"
                                id="assignmentParticipants"
                                className="rounded-2xl w-full block p-3.5 text-xl bg-white border border-gray-300 focus:ring-mk-blue focus:border-mk-blue resize-none"
                                placeholder="Antal deltagare"
                                {...register('participants', { valueAsNumber: true })}
                            />
                            {errors.participants?.message && <ErrorText text={errors.participants?.message}/>}
                        </div>
                        <textarea
                            id="assignmentDesc"
                            className="mt-6 h-[35vh] w-full flex-1 rounded-2xl block p-3.5 text-xl bg-white border border-gray-300 focus:ring-mk-blue focus:border-mk-blue resize-none"
                            placeholder="Beskrivning"
                            {...register('desc')}
                        />
                        {errors.desc?.message && <ErrorText text={errors.desc?.message}/>}
                        <textarea
                            id="assignmentMotivation"
                            className="mt-6 h-[15vh] w-full flex-1 rounded-2xl block p-3.5 text-xl bg-white border border-gray-300 focus:ring-mk-blue focus:border-mk-blue resize-none"
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
                        <div className="flex justify-between mt-6 bottom-10 bg-green-100">
                            <div className="">
                                <Link href="/home">
                                    <button className="bg-mk-yellow hover:bg-mk-yellow-hover text-white text-lg rounded-2xl font-bold px-6 py-2" type="button">Tillbaka</button>
                                </Link>
                                <Link href="/home" className="px-2">
                                    <button className="  bg-mk-blue hover:bg-mk-blue-hover text-white text-lg rounded-2xl font-bold px-6 py-2" type="button">Spara</button>
                                </Link>
                            </div>
                            <div className=" justify-self-end ">
                                <input className="bg-mk-blue hover:bg-mk-blue-hover text-white text-lg rounded-2xl font-bold px-6 py-2" type="submit" value="Skicka in"/>
                            </div>
                        </div>
                    </form>
                </div>
            </MainPage>
    );
};

export default NewUppdrag;
