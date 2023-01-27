import { proseWrap } from "../../prettier.config.cjs";

interface ButtonProps {
    children: React.ReactNode;
}

const SideButton = (props: ButtonProps) => {
    return (
        <button className="bg-mk-blue hover:bg-sky-900 text-white text-start font-bold tracking-wide text-lg py-4 px-4 rounded-2xl">
            {props.children}
        </button>
    );
};

export default SideButton;