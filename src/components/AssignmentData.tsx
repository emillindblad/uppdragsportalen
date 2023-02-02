import type { Uppdrag } from "@prisma/client";
import type { FunctionComponent } from "react";

interface UppdragsProps {
    data: Uppdrag[]
}

const AssignmentData: FunctionComponent<UppdragsProps> = (props: UppdragsProps) => {

    return (
        <>
            {props.data?.map( (u) => {
                return (
                    <tr className="justify-start space-x-8 max-w-screen-2xl border-b-2 border-indigo-400 " key={u.id}>
                        <td className="flex-initial max-w-[140px]">{u.title}</td>
                        <td className="flex-initial max-w-[180px]">{u.nollk}</td>
                        <td className="flex-initial max-w-[180px]">{String(u.private)}</td>
                        <td className="flex-initial max-w-[180px]">{u.desc}</td>

                        {/*
                        <td className="flex-initial max-w-[180px]">{u.place}</td>
                        <td className="flex-initial max-w-[180px]">{u.time}</td>
                        <td className="flex-initial max-w-[180px]">{u.participants}</td>
                        <td className="flex-initial max-w-[180px]">{u.motivation}</td>
                        */}
                    </tr>
                )
                })
            }
        </>
    )
}

export default AssignmentData;
