import Image from "next/image"
import mkLogoBlueBg from "../../public/img/mkbluebackground.png"

const Navbar = () => {
    return (
        <header className="fixed top-0 w-screen flex align-middle h-[60px] py-2 px-4 bg-mk-blue">
            <div className="absolute top-0">
                <Image className="flex-initial h-auto w-[70px]" src={mkLogoBlueBg} alt={"MK Logga"} />
            </div>
            <p className="flex items-center text-white text-2xl ml-20">MOTTAGNINGSKOMMITTÉN</p>
        </header>
    )
};

export default Navbar;
