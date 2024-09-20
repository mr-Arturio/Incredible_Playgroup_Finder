import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Import the Image component
import { FiMenu, FiX } from "react-icons/fi";
import HamburgerMenu from "./HamburgerMenu";
import { useLanguage } from "../../context/LanguageContext";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { translation } = useLanguage();

  const icon = translation === "en" ? "/logo_english.png" : "/logo_french.png";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto 2xl:px-16 flex justify-between items-center py-2 sm:py-2.5 px-7 sm:px-4 lg:px-2.5 ">
        {/* Logo Section */}
        <div className="flex items-center">
          <a
            href="https://www.parentresource.ca/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={icon}
              alt="Logo"
              width={100}
              height={100}
              className="h-14 lg:h-16 xl:h-20 w-auto"
              unoptimized
            />
          </a>
        </div>
        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {isOpen ? (
              <FiX className="text-3xl" />
            ) : (
              <FiMenu className="text-3xl" />
            )}
          </button>
        </div>
        {/* Navigation Links */}
        <div className="hidden md:flex 2xl:space-x-6 xl:space-x-3 xl:mr-8">
          <Link href="https://www.parentresource.ca/" className="navBarText">
            Home
          </Link>
          <Link
            href="https://www.parentresource.ca/about"
            className="navBarText"
          >
            About Us
          </Link>
          <Link
            href="https://www.parentresource.ca/copy-of-our-impact"
            className="navBarText"
          >
            Get Involved
          </Link>
          <Link
            href="https://www.parentresource.ca/programs"
            className="navBarText"
          >
            Parents
          </Link>
          <Link
            href="https://www.parentresource.ca/professionals"
            className="navBarText"
          >
            Professionals
          </Link>
          <Link
            href="https://www.parentresource.ca/blog"
            className="navBarText"
          >
            Blog
          </Link>
          <Link
            href="https://www.parentresource.ca/volunteering"
            className="navBarText"
          >
            Contact
          </Link>
        </div>
        {/* Social Icons and Button */}
        <div className="hidden lg:flex items-center xl:space-x-3 space-x-1">
          <a
            href="https://www.facebook.com/parentresourcecentre"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://static.wixstatic.com/media/11062b_0bec1cadb27b4d4a9898a740648fc5a9~mv2.png/v1/fill/w_39,h_39,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_0bec1cadb27b4d4a9898a740648fc5a9~mv2.png"
              alt="Facebook"
              width={39}
              height={39}
              className="navBarIcons"
            />
          </a>
          <a
            href="https://www.instagram.com/parentresource"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://static.wixstatic.com/media/11062b_482d38aa2aaa49a5b45774ebe9a5b544~mv2.png/v1/fill/w_39,h_39,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_482d38aa2aaa49a5b45774ebe9a5b544~mv2.png"
              alt="Instagram"
              width={39}
              height={39}
              className="navBarIcons"
            />
          </a>
          <a
            href="https://www.linkedin.com/company/parent-resource-centre/mycompany/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://static.wixstatic.com/media/11062b_23e5890c2dfc4a04af80178b43ef66fd~mv2.png/v1/fill/w_39,h_39,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_23e5890c2dfc4a04af80178b43ef66fd~mv2.png"
              alt="LinkedIn"
              width={39}
              height={39}
              className="navBarIcons"
            />
          </a>
        </div>
        <div className="hidden lg:flex">
          <a
            href="https://www.canadahelps.org/en/dn/27631"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm relative bg-mainBlue text-white border-transparent border-solid border-0 rounded-lg shadow-lg px-2 xl:px-5 py-1 xl:py-3 hover:bg-amber transition-colors duration-500 ease-in-out flex items-center justify-center"
          >
            Donate Now
          </a>
        </div>
      </div>
      {/* Full-Screen Overlay Menu */}
      <HamburgerMenu isOpen={isOpen} toggleMenu={toggleMenu} />
    </nav>
  );
};

export default NavBar;
