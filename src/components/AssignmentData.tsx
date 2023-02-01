//const a = <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" scope="row">Uppdrag</td>;
//const b = <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">NollKIT</td>;
//const c = <td className="px-6 py-4 font-medium whitespace-nowrap text-black font-bold">Ej granskad</td>;
//const d = <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"></td>;
//
//
//const Assignment = [a,b,c,d];

//const AssignmentData = () => {
    //return (
        //<>
        //{[Assignment,Assignment,Assignment,Assignment,Assignment,Assignment,Assignment].map((value) =>
            //<tr className="bg-white border-b border-gray-300">{value}</tr>)}
        //</>
    //);
//};


import type { FC } from "react";
import { api } from "../utils/api";

const AssignmentData: FC = () => {

    const uppdrag = api.uppdrag.getUppdrag.useQuery(undefined, {
        refetchOnWindowFocus: false
    });

    return (
        <>
            {uppdrag.data?.map( (u) => {
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
