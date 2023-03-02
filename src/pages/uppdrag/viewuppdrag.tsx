import type { NextPage } from "next";
import Image from "next/image";
import MainPage from "../../components/MainPage";
import dataLogo from "../../../public/img/dnollk.png";
import { api } from "../../utils/api";
import { type NextRouter, withRouter, useRouter } from "next/router";
import { useEffect } from "react";
import UppdragComment from "../../components/UppdragComment";
import Link from "next/link";

interface Props {
    id: string
    router: NextRouter
}

const ViewUppdrag: NextPage<Props> = (props: Props) => {

    const router = useRouter();

    useEffect(() => {
        if (Object.keys(props.router.query).length === 0) {
            void router.push('/home');
        }
    }, [props.router.query, router]);

    const uppdragId = props.router.query.id?.toString() as string

    const { data } = api.uppdrag.getById.useQuery({id: uppdragId});

    const {data: isMK } = api.user.getUserStatus.useQuery();

    const {data: uppdragAuthor} = api.user.getUser.useQuery({id: data?.authorId as string});

    const imagePath = "/img/" + (uppdragAuthor?.nollk as string) + ".png";

    return (
        <>
            <MainPage title={data?.title}>
                <div className="grid grid-cols-6 grid-rows-[100px_minmax(300px,auto)] h-full">
                    <div className="flex col-start-1 col-end-7 row-start-1 row-span-1 border-b-2 border-black p-2 h-20 items-center justify-between">
                        <div className="flex items-start text-4xl font-bold text-left">
                            {data?.title}
                        </div>
                            {/* Hardcoded now, change to author + nollk pic + email */}
                        <div className="flex flex-row-reverse">
                            <Image src={`${imagePath}` } height={60} width={60} alt="" className="max-w-[60px]" />
                            <div className="mr-4">
                                <p className="text-black font-bold text-lg tracking-wide text-right">{uppdragAuthor?.name}, {uppdragAuthor?.year}</p>
                                <p className="text-black text-s font-semibold tracking-wide text-right">{uppdragAuthor?.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row-start-2 col-start-1 col-span-7 text-2xl font-bold text-left px-2">
                        {data?.desc}
                    </div>
                    <div className="row-start-3 col-start-1 col-end-7">
                            <div className="text-2xl font-bold text-left px-2"> Antal deltagare: {data?.participants} </div>
                            <div className="text-2xl font-bold text-left px-2"> Plats: {data?.place} </div>
                            <div className="text-2xl font-bold text-left px-2"> Tid: {data?.time} </div>
                            <div className="text-2xl font-bold text-left px-2"> Motivation: {data?.motivation} </div>
                    </div>
                    {isMK ? (<UppdragComment/>) :
                    (<div className="col-start-1 col-span-1">
                        <Link href="/home">
                            <button className="h-[44px] w-[125px] bg-mk-yellow hover:bg-mk-yellow-hover text-white text-lg rounded-2xl font-bold px-6 py-2" type="button">Tillbaka</button>
                        </Link>
                    </div>)}
                </div>
            </MainPage>
        </>
    );
};

export default withRouter(ViewUppdrag);
