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
                    <div role="assignments" className="grid grid-cols-4 text-left text-xl hover:bg-gray-300" key={u.id}>
                        <div onClick={() => nav(u.id)} className="flex-initial ml-4 my-2 max-w-[180px] hover:cursor-pointer hover:underline">{u.title}</div>
                        <div className="flex-initial my-2 ml-1 max-w-[180px]">{u.status}</div>
                        <div className="flex-initial  max-w-[180px]">{u.private.toString()}</div>
                        <div className="flex-initial my-2 ml-1">{u.place}</div>

                        {/*
                        <div className="flex-initial col-span-1 max-w-[180px]">{u.nollk}</div>
                        <td className="flex-initial max-w-[180px]">{u.place}</td>
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
