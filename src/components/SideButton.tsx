import { proseWrap } from "../../prettier.config.cjs";

interface ButtonProps {
    children: React.ReactNode;
}

const SideButton = (props: ButtonProps) => {
    return (
        <button className="bg-mk-blue hover:bg-sky-900 text-white text-start font-bold tracking-wide text-xl py-5 px-6 rounded-2xl">
            {props.children}
        </button>
    );
};

export default SideButton;