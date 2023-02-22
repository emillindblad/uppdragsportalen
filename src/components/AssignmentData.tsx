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
                    <div role="assignments" className="grid grid-cols-5 text-left text-xl" key={u.id}>
                        <div onClick={() => nav(u.id)} className="flex-initial col-span-2 ml-4 my-2 max-w-[180px] hover:cursor-pointer hover:underline">{u.title}</div>
                        {/* <div className="flex-initial col-span-1 max-w-[180px]">{u.nollk}</div> */}
                        <div className="flex-initial my-2 ml-1 col-span-1 max-w-[180px]">{String(u.private)}</div>
                        <div className="flex-initial my-2 ml-1 col-span-2 ">{u.motivation}</div>

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
