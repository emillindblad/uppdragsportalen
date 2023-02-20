import type { NextPage } from "next";
import Link from "next/link";
import MainPage from "../../components/MainPage";

import { useForm } from "react-hook-form";
import { type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ErrorText } from "../../components/LoginForm";

export const uppdragCreateSchema = z.object({
    year: z.number().min(4),
    nollk: z.string().min(2),
    title: z.string().min(1,{message: 'Vänligen ange en titel på ditt uppdrag'}),
    place: z.string().min(1,{message: 'Vänligen skriv in din email'}),
    time: z.string().min(1,{message: 'Vänligen skriv in din email'}),
    participants: z.number().min(1,{ message: 'Vänligen ange antal deltagare' }),
    desc: z.string().min(1,{message: 'Vänligen skriv in din email'}),
    motivation: z.string().min(1, { message: 'Vänligen skriv in ditt lösenord' }),
    private: z.boolean()
});

type FormSchemaType = z.infer<typeof uppdragCreateSchema>;

const NewUppdrag: NextPage = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm<FormSchemaType>({ resolver: zodResolver(uppdragCreateSchema), });
    const onSubmit: SubmitHandler<FormSchemaType> = data => console.log("dab");

    return (
        <>
            <MainPage title={"Nytt uppdrag"}>
                <div className="border-b-2 border-black p-2 my-4">
                    <h1 className="text-4xl text-left text-black font-bold">Skapa nytt uppdrag</h1>
                </div>
                <div className="">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input id="assignmentTitle" className="rounded-2xl w-full block p-3.5 text-2xl bg-white border border-gray-300 focus:ring-mk-blue focus:border-mk-blue resize-none" placeholder="Titel" {...register('title')} />
                        {errors.title?.message && <ErrorText text={errors.title?.message}/>}
                        <div className="flex mt-6 gap-4">
                            <input id="assignmentPlace" className="rounded-2xl w-full block p-3.5 text-2xl bg-white border border-gray-300 focus:ring-mk-blue focus:border-mk-blue resize-none" placeholder="Plats" {...register('place')} />
                            {errors.place?.message && <ErrorText text={errors.place?.message}/>}
                            <input id="assignmentTime" className="rounded-2xl w-full block p-3.5 text-2xl bg-white border border-gray-300 focus:ring-mk-blue focus:border-mk-blue resize-none" placeholder="Tid" {...register('time')} />
                            {errors.time?.message && <ErrorText text={errors.time?.message}/>}
                            <input id="assignmentParticipants" className="rounded-2xl w-full block p-3.5 text-2xl bg-white border border-gray-300 focus:ring-mk-blue focus:border-mk-blue resize-none" placeholder="Antal deltagare" {...register('participants')} />
                            {errors.participants?.message && <ErrorText text={errors.participants?.message}/>}
                        </div>
                        <textarea id="assignmentDesc" className="mt-6 h-[40vh] w-full flex-1 rounded-2xl block p-3.5 text-2xl bg-white border border-gray-300 focus:ring-mk-blue focus:border-mk-blue resize-none" placeholder="Beskrivning" {...register('desc')} />
                        {errors.desc?.message && <ErrorText text={errors.desc?.message}/>}
                        <textarea id="assignmentMotivation" className="mt-6 h-[15vh] w-full flex-1 rounded-2xl block p-3.5 text-2xl bg-white border border-gray-300 focus:ring-mk-blue focus:border-mk-blue resize-none" placeholder="Motivering" {...register('motivation')} />
                        {errors.desc?.message && <ErrorText text={errors.desc?.message}/>}
                        <div className="relative bottom-10">
                            <div className="absolute bottom-3 left-0">
                                <Link href="/home">
                                    <button className="bg-mk-yellow hover:bg-mk-yellow-hover text-white text-lg rounded-2xl font-bold px-6 py-2" type="button">Tillbaka</button>
                                </Link>
                                <Link href="/home" className="px-2">
                                    <button className="  bg-mk-blue hover:bg-mk-blue-hover text-white text-lg rounded-2xl font-bold px-6 py-2" type="button">Spara</button>
                                </Link>
                            </div>
                            <div className="absolute bottom-3 right-0">
                                <input className="bg-mk-blue hover:bg-mk-blue-hover text-white text-lg rounded-2xl font-bold px-6 py-2" type="submit" value="Skicka in"/>
                            </div>
                        </div>
                    </form>
                </div>
            </MainPage>
        </>
    );
};

export default NewUppdrag;
