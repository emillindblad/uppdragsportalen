import Link from "next/link.js";
import { Url } from "url";
import { useState } from "react";



interface ButtonProps {
    children: React.ReactNode;
    link: String;
    onClick?: () => void;
}

// alla knappar i en lista, onClick setAll hook

const SideButton = (
    props: ButtonProps
    ) => {
    const [active, setActive] = useState(false);
    const handleClick = () =>  setActive(!active);
    return (
        <div>
            <Link href={`${props.link}`}>
                <button onClick={handleClick} className={`bg-mk-blue hover:bg-sky-900 text-white text-start font-bold tracking-wide w-full text-lg py-4 px-4 rounded-2xl ${active ? "bg-mk-yellow" : ""}`}>
                    {props.children}
                </button>
            </Link>
        </div>
    );
};


export default SideButton;