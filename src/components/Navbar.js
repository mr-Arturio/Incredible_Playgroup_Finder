import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import '../app/fonts.css';


const Navbar = () => {
  return (
    <nav className="bg-plum text-white py-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="logo">
          {/* Assuming you have a logo.png in your public folder */}
          <Image
            src="/IPFicon.svg"
            alt="Logo"
            width={170}
            height={170}
            className="rounded-full"
          />
        </div>
        <h1 className="text-xl md:text-5xl text-center mt-4 mr-4 font-lazydog">
          Welcome to THE INCREDIBLE PLAYGROUP FINDER!
        </h1>
        <div>
        <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
