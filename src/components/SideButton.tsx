import Link from "next/link.js";
import { useRouter } from "next/router";


interface ButtonProps {
    children: React.ReactNode;
    link: string;

    //hoverColor: String;
}

// activeButtonIndex === 1 ? "bg-mk-blue-select hover:bg-mk-blue-select" : "bg-mk-blue hover:bg-mk-blue-hover"
const SideButton = (
    props: ButtonProps
    ) => {
    const router = useRouter();
    const isActive = router.asPath === "/" + props.link;
    console.log(router.asPath)
    console.log(props.link)
    return (
        <div>
            <Link href={`/${props.link}`}>
            {/* <button onClick={props.onClick} className={`${props.hoverColor}  text-white text-start font-bold tracking-wide w-full text-lg py-4 px-4 rounded-2xl`}> */}
            {/* {`banner large ${active ? "active" : ""} */}
            <button className={`text-white text-start font-bold tracking-wide w-full text-lg py-4 px-4 rounded-2xl ${isActive ? "bg-mk-blue-select hover:bg-mk-blue-select" : "bg-mk-blue hover:bg-mk-blue-hover"}`}>
                    {props.children}
                </button>
            </Link>
        </div>
    );
};


export default SideButton;
