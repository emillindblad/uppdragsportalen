import { proseWrap } from "../../prettier.config.cjs";

interface ButtonProps {
    children: React.ReactNode;
}

const SideButton = (props: ButtonProps) => {
    return (
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {props.children}
        </button>
    );
};

export default SideButton;