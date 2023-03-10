import Link from "next/link";
import { useForm } from "react-hook-form";
import { type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UppdragStatus } from "@prisma/client";
import { ErrorText } from "./ErrorText";

const commentSchema = z.object({
    comment: z.string().min(2,{ message: "Vänligen skriv in en kommentar" }),
    status: z.nativeEnum(UppdragStatus)
});

type FormSchemaType = z.infer<typeof commentSchema>;

const UppdragComment = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormSchemaType>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            //status: 'DRAFT'
        }
    });

    const submit: SubmitHandler<FormSchemaType> = (data) => {
        console.log(data)
    };


    return (
        <>
            <form action="">
                <div className="flex flex-col gap-4">
                    <div className="flex row-start-6 col-start-1 col-span-7 items-end px-2">
                        <form action=""></form>
                        <textarea
                            id="mkComment"
                            className="h-[15vh] w-full flex-1 rounded-2xl block p-3.5 text-xl bg-white border border-gray-300 focus:ring-mk-blue focus:border-mk-blue resize-none"
                            placeholder="Kommentarer.."
                            {...register('comment')}
                        >
                        </textarea>
                    </div>
                    <div className="flex row-start-7 col-start-1 col-end-7 items-end justify-between px-2">
                        <div className="flex gap-5">
                            <Link href="/home">
                                <button className="h-[44px] w-[125px] bg-mk-yellow hover:bg-mk-yellow-hover text-white text-lg rounded-2xl font-bold px-6 py-2" type="button">Tillbaka</button>
                            </Link>
                            {errors.comment?.message && <ErrorText text={errors.comment?.message}/>}
                            {errors.status?.message && <ErrorText text='Vänligen välj en status på uppdraget'/>}
                        </div>
                        <div className="flex col-end-7 col-span-4">
                            <div className="flex justify-between mr-6">
                                <div className="flex items-center mr-6">
                                    <input
                                        type="radio"
                                        value={UppdragStatus.DENIED}
                                        className="w-4 h-4 text-mk-blue bg-gray-100 border-gray-300 focus:ring-mk-blue"
                                        {...register('status')}
                                    />
                                    <label htmlFor="neka" className="ml-2 text-lg font-bold text-black">Neka</label>
                                </div>
                                <div className="flex items-center mr-6">
                                    <input
                                        type="radio"
                                        id="retur"
                                        value={UppdragStatus.RETURN}
                                        className="w-4 h-4 text-mk-blue bg-gray-100 border-gray-300 focus:ring-mk-blue"
                                        {...register('status')}
                                    />
                                    <label htmlFor="retur" className="ml-2 text-lg font-bold text-black">Retur</label>
                                </div>
                                <div className="flex items-center mr-6">
                                    <input
                                        type="radio"
                                        id="ok"
                                        value={UppdragStatus.APPROVED}
                                        className="w-4 h-4 text-mk-blue bg-gray-100 border-gray-300 focus:ring-mk-blue"
                                        {...register('status')}
                                    />
                                    <label htmlFor="ok"className="ml-2 text-lg font-bold text-black">Godkänn</label>
                                </div>
                            </div>
                            <div className="flex">
                                <Link href="/home">
                                    <button className="h-[44px] w-[125px] bg-mk-blue hover:bg-mk-blue-hover text-white text-lg rounded-2xl font-bold px-6 py-2"
                                        type="button"
                                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                                        onClick={handleSubmit(submit)}
                                    >
                                        Skicka
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default UppdragComment;
