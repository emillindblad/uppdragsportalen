import type { NextPage } from "next";
import React from "react";
import MainPage from "../components/MainPage";
import { api } from "../utils/api";

const Accounts: NextPage = () => {

    const { data: pendingUsers } = api.user.getAllUsersPendingAccept.useQuery();
    const { data: allUsers } = api.user.getAllAcceptedUsers.useQuery();

    const acceptMutation = api.user.acceptUser.useMutation();
    const rejectMutation = api.user.rejectUser.useMutation();
    const deleteMutation = api.user.deleteUser.useMutation();

    const acceptUser = (id: string) => {
        acceptMutation.mutate({ id: id });
        console.log("accepted", id);
    }

    const rejectUser = (id: string) => {
        rejectMutation.mutate({ id: id });
        console.log("rejected", id);
    }

    const deleteUser = (id: string) => {
        deleteMutation.mutate({ id: id });
        console.log("deleted", id);
    }


    console.log(pendingUsers)

    return (
        <>
            <MainPage title={"Konton"}>
                <div className="grid grid-cols-6 mx-4 text-left text-xl border-b-2 border-gray-300">
                    <div className="flex-initial my-2 font-bold col-span-2">Email</div>
                    <div className="flex-initial my-2 font-bold col-span-1">Name</div>
                    <div className="flex-initial my-2 font-bold col-span-1">NollK</div>
                    <div className="my-2 text-center font-bold col-span-2">Accept?</div>
                </div>
                {pendingUsers?.length === 0 ? <div className="text-center m-4 w-full text-3xl">No pending users :D</div> : <></> }
                {pendingUsers?.map((u) => {
                    return (
                        <div key={u.id} className="grid grid-cols-6 mx-4 text-left text-xl items-center">
                            <div className="flex-initial my-2 col-span-2">{u.email}</div>
                            <div className="flex-initial my-2 col-span-1 ">{u.name}</div>
                            <div className="flex-initial my-2 col-span-1 ">{u.nollk}</div>
                            <div className="flex flex-row my-2 col-span-2 justify-evenly">
                                <div className="flex items-center">
                                    {u.accepted.toString()}
                                </div>
                                {u.accepted ?
                                    <div></div>
                                    :
                                    <div className="flex justify-between flex-row">
                                        {/* checkmark */}
                                        <div onClick={() => rejectUser(u.id)} className="cursor-pointer rounded-md p-1 m-1 transition-colors bg-red-400 hover:bg-red-700">No</div>
                                        {/* xmark */}
                                        <div onClick={() => acceptUser(u.id)} className="cursor-pointer rounded-md p-1 m-1 transition-colors bg-green-400 hover:bg-green-700">Yes</div>
                                    </div>}
                            </div>

                        </div>
                    )
                })
                }
                <div className="grid grid-cols-4 mx-4 text-left text-xl border-b-2 border-gray-300">
                    <div className="flex-initial my-2 font-bold col-span-1">Email</div>
                    <div className="flex-initial my-2 font-bold col-span-1">Name</div>
                    <div className="flex-initial my-2 font-bold col-span-1">NollK</div>
                    <div className="my-2 text-center font-bold col-span-1">Delete?</div>
                </div>
                {allUsers?.map((u) => {
                    return (
                        <div key={u.id} className="grid grid-cols-4 mx-4 text-left text-xl items-center">
                            <div className="flex-initial my-2 col-span-1">{u.email}</div>
                            <div className="flex-initial my-2 col-span-1 ">{u.name}</div>
                            <div className="flex-initial my-2 col-span-1 ">{u.nollk}</div>
                            <div onClick={() => deleteUser(u.id)} className="flex my-2 col-span-1 text-center cursor-pointer rounded-md p-1 m-1 transition-colors bg-red-400 hover:bg-red-700">Delete</div>
                        </div>
                    )
                })}



            </MainPage>
        </>
    );
};

export default Accounts;