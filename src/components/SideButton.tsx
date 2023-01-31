import Link from "next/link.js";
import { Url } from "url";



interface ButtonProps {
    children: React.ReactNode;
    link: String;
}

const SideButton = (props: ButtonProps) => {
    return (
        <div>
            <Link href={`${props.link}`}>
                <button className="bg-mk-blue hover:bg-sky-900 text-white text-start font-bold tracking-wide w-full text-lg py-4 px-4 rounded-2xl ">
                    {props.children}
                </button>
            </Link>
        </div>
    );
};

export default SideButton;