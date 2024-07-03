import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";


const Navbar = () => {
  return (
    <nav className="bg-plum text-white py-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="logo">
          {/* Assuming you have a logo.png in your public folder */}
          <Image
            src="/Play_Goup.png"
            alt="Logo"
            width={150}
            height={150}
            className="rounded-full"
          />
        </div>
        <h1 className="text-xl md:text-4xl font-bold text-center mt-4 mr-1">
          Welcome to the Incredible Playgroup Finder!
        </h1>
        <div className="flex space-x-4 mr-2">
        <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
