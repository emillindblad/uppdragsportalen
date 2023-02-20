import type { Uppdrag } from "@prisma/client";
import { useRouter } from "next/router";
import type { FunctionComponent } from "react";

interface UppdragsProps {
    data: Uppdrag[]
}

const AssignmentData: FunctionComponent<UppdragsProps> = (props: UppdragsProps) => {
    const router = useRouter();

    const nav = (data: string) => {
        void router.push({
            pathname: '/uppdrag/viewuppdrag',
            query: { id: data }
        }, '/uppdrag/viewuppdrag')
    }

    return (
        <>
            {props.data?.map( (u) => {
                return (
                    <div className="flex flex-column-4 justify-start space-x-8 max-w-screen-2xl text-lg" key={u.id}>
                        <div onClick={() => nav(u.id)} className="flex-initial max-w-[140px] hover:cursor-pointer hover:underline">{u.title}</div>
                        <div className="flex-initial max-w-[180px]">{u.nollk}</div>
                        <div className="flex-initial max-w-[180px]">{String(u.private)}</div>
                        <div className="flex-initial max-w-[180px]">{u.desc}</div>

                        {/*
                        <td className="flex-initial max-w-[180px]">{u.place}</td>
                        <td className="flex-initial max-w-[180px]">{u.time}</td>
                        <td className="flex-initial max-w-[180px]">{u.participants}</td>
                        <td className="flex-initial max-w-[180px]">{u.motivation}</td>
                        */}
                    </div>
                )
                })
            }
        </>
    )
}

export default AssignmentData;
