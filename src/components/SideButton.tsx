import Link from "next/link.js";
import { Url } from "url";
import { useState } from "react";

interface ButtonProps {
    children: React.ReactNode;
    link: String;
    onClick: () => void
    id: number;
    hoverColor: String;
}

const SideButton = (
    props: ButtonProps
    ) => {
    return (
        <div>
            <Link href={`${props.link}`}>
            <button id={`${props.id}`} onClick={props.onClick} className={`${props.hoverColor}  text-white text-start font-bold tracking-wide w-full text-lg py-4 px-4 rounded-2xl`}>
                    {props.children}
                </button>
            </Link>
        </div>
    );
};


export default SideButton;