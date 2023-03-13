import type { Uppdrag } from "@prisma/client";
import { useRouter } from "next/router";
import type { FunctionComponent } from "react";
import { api } from "../utils/api";

interface UppdragsProps {
    data: Uppdrag[]
}

const AssignmentData: FunctionComponent<UppdragsProps> = (props: UppdragsProps) => {
    const router = useRouter();

    const nav = (data: string) => {
        void router.push({
            pathname: '/uppdrag/viewuppdrag/[id]',
            query: { id: data }
        })
    }

    // different data depending on user (MK or Nollk)
    const {data: isMK} = api.user.getUserStatus.useQuery();
    console.log(props.data.length)
    if (props.data.length === 0) {
        return <p>Nothing to show</p>
    }


    return (
        <>
            {props.data?.map( (u) => {
                return (
                    <div role="assignments" className="grid grid-cols-5 text-left text-xl" key={u.id}>
                        <div onClick={() => nav(u.id)} className="flex-initial ml-4 my-2 max-w-[180px] hover:cursor-pointer hover:underline">{u.title}</div>
                        <div className="flex-initial my-2 ml-1 max-w-[180px]">{u.place}</div>
                        {isMK ? <div className="flex-initial col-span-1 max-w-[180px]">{u.nollk}</div>
                              : (<>
                                    <div className="flex-initial  max-w-[180px]">{u.time}</div>
                                    <div className="flex-initial  max-w-[180px]">{u.private.toString()}</div>
                                </>)
                        }
                        <div
                            className={
                                `flex-initial my-2 ml-1 max-w-[180px]
                                ${u.status === 'APPROVED' ? 'font-bold text-green-500'
                                : u.status === 'DENIED' ? 'font-bold text-red-500'
                                : u.status === 'RETURN' ? 'font-bold text-amber-500'
                                : '' }`
                            }>
                            {u.status}</div>

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
