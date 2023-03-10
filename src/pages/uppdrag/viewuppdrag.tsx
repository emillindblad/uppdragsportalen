import type { NextPage } from "next";
import Image from "next/image";
import MainPage from "../../components/MainPage";
import { api } from "../../utils/api";
import { type NextRouter, withRouter, useRouter } from "next/router";
import { useEffect } from "react";
import UppdragComment from "../../components/UppdragComment";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface Props {
    id: string
    router: NextRouter
}

const ViewUppdrag: NextPage<Props> = (props: Props) => {

    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        if (Object.keys(props.router.query).length === 0) {
            void router.push('/home');
        }
    }, [props.router.query, router]);

    const uppdragId = props.router.query.id?.toString() as string

    const { data: uppdrag } = api.uppdrag.getById.useQuery({id: uppdragId});

    const { data: isMK } = api.user.getUserStatus.useQuery();

    const imagePath = "/img/" + (uppdrag?.author.nollk as string) + ".png";

    return (
        <>
            <MainPage session={session} title={uppdrag?.title}>
                <div className="flex flex-col grid-cols-6 grid-rows-[100px_minmax(0,auto)] h-full pb-6 justify-between">
                    <div className="flex flex-col gap-3">
                    <div className="flex col-start-1 col-end-7 row-start-1 row-span-1 border-b-2 border-black p-2 h-20 items-center justify-between">
                        <div className="flex items-start text-4xl font-bold text-left">
                            {uppdrag?.title}
                        </div>
                            {/* Hardcoded now, change to author + nollk pic + email */}
                        <div className="flex flex-row-reverse">
                            <Image src={`${imagePath}` } height={60} width={60} alt="" className="max-w-[60px]" />
                            <div className="mr-4">
                                <p className="text-black font-bold text-lg tracking-wide text-right">{uppdrag?.author?.name}, {uppdrag?.author?.year}</p>
                                <p className="text-black text-s font-semibold tracking-wide text-right">{uppdrag?.author?.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row-start-2 col-start-1 col-end-7 h-fit">
                            <div className="text-xl font-bold text-left px-2"> Antal deltagare:
                                <p className="ml-2 inline font-normal">
                                    {uppdrag?.participants}
                                </p>
                            </div>
                            <div className="text-xl font-bold text-left px-2"> Plats:
                                <p className="ml-2 inline font-normal">
                                    {uppdrag?.place}
                                </p>
                            </div>
                            <div className="text-xl font-bold text-left px-2"> Tid:
                                <p className="ml-2 inline font-normal">
                                    {uppdrag?.time}
                                </p>
                            </div>
                            <div className="text-xl font-bold text-left px-2"> Status:
                                <p className="ml-2 inline font-normal">
                                    {uppdrag?.status}
                                </p>
                            </div>
                            <div className="text-xl font-bold text-left px-2"> Privat:
                                <p className="ml-2 inline font-normal">
                                    {uppdrag?.private.toString()}
                                </p>
                            </div>
                            <div className="text-xl font-bold text-left px-2"> Beskrivning:
                                <p className="font-normal">
                                    {uppdrag?.desc}
                                </p>
                            </div>
                    </div>
                    <div className="row-start-3 col-start-1 col-span-7 font-bold text-xl text-left px-2"> Motivering:
                        <p className="font-normal">
                            {uppdrag?.motivation}
                        </p>
                    </div>
                    <div className="row-start-3 col-start-1 col-span-7 font-bold text-xl text-left px-2"> Kommentar:
                        <p className="font-normal">
                            {uppdrag?.comment}
                        </p>
                    </div>
                    </div>
                    <div>
                        {isMK ? (<UppdragComment uppdragId={uppdrag?.id as string}/>) :
                            (
                                <div className="flex gap-9 col-start-1 col-span-2 ">
                                    <button
                                        className="h-[44px] w-[125px] bg-mk-yellow hover:bg-mk-yellow-hover text-white text-lg rounded-2xl font-bold px-6 py-2"
                                        type="button"
                                        onClick={() => router.back()}
                                    >
                                        Tillbaka
                                    </button>
                                {uppdrag?.nollk === session?.user.nollk ?
                                    <Link href={{
                                            pathname: '/uppdrag/edituppdrag/[id]',
                                            query: { id: uppdrag?.id } }}>
                                        <button
                                            className="h-[44px] w-[125px] bg-mk-blue hover:bg-mk-blue-hover text-white text-lg rounded-2xl font-bold px-6 py-2"
                                            type="button">
                                            Redigera
                                        </button>
                                    </Link>

                                : <p></p>
                                }
                                </div>
                            )
                        }
                    </div>
                </div>
            </MainPage>
        </>
    );
};

export default withRouter(ViewUppdrag);
