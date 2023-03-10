import Link from "next/link.js";
import { useRouter } from "next/router";


 /**
 * Handles the buttons in the side menu.
 * Commented code is a previous solution that might become relevant again.
 */

interface ButtonProps {
    children: React.ReactNode;
     /**
    * The URL connected to the button, if link is active, the styling of the button changes.
    */
    link: string;

    //hoverColor: String;
}

// activeButtonIndex === 1 ? "bg-mk-blue-select hover:bg-mk-blue-select" : "bg-mk-blue hover:bg-mk-blue-hover"
const SideButton = (
    props: ButtonProps
    ) => {
    const router = useRouter();
    const isActive = router.asPath === "/" + props.link;
    return (
        <div>
            <Link href={`/${props.link}`}>
            {/* <button onClick={props.onClick} className={`${props.hoverColor}  text-white text-start font-bold tracking-wide w-full text-lg py-4 px-4 rounded-2xl`}> */}
            {/* {`banner large ${active ? "active" : ""} */}
            <button className={`text-white text-start font-bold tracking-wide w-full text-lg py-5 px-4 my-3 rounded-2xl ${isActive ? "bg-mk-blue-select hover:bg-mk-blue-select" : "bg-mk-blue hover:bg-mk-blue-hover"}`}>
                    {props.children}
                </button>
            </Link>
        </div>
    );
};


export default SideButton;
