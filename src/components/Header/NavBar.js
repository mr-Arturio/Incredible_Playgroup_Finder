import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import HamburgerMenu from "./HamburgerMenu";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto 2xl:px-16 flex justify-between items-center py-2.5 px-2.5">
        {/* Logo Section */}
        <div className="flex items-center">
          <a
            href="https://www.parentresource.ca/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/logo_english.svg" alt="Logo" className="h-14 md:h-20 w-auto" />
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
        <div className="hidden md:flex 2xl:space-x-6 space-x-3 mr-8">
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
        <div className="hidden md:flex items-center space-x-3">
          <a
            href="https://www.facebook.com/parentresourcecentre"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://static.wixstatic.com/media/11062b_0bec1cadb27b4d4a9898a740648fc5a9~mv2.png/v1/fill/w_39,h_39,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_0bec1cadb27b4d4a9898a740648fc5a9~mv2.png"
              alt="Facebook"
              className="h-[37px] w-[37px] object-cover hover:scale-110"
            />
          </a>
          <a
            href="https://www.instagram.com/parentresource"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://static.wixstatic.com/media/11062b_482d38aa2aaa49a5b45774ebe9a5b544~mv2.png/v1/fill/w_39,h_39,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_482d38aa2aaa49a5b45774ebe9a5b544~mv2.png"
              alt="Instagram"
              className="h-[37px] w-[37px] object-cover hover:scale-110"
            />
          </a>
          <a
            href="https://www.linkedin.com/company/parent-resource-centre/mycompany/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://static.wixstatic.com/media/11062b_23e5890c2dfc4a04af80178b43ef66fd~mv2.png/v1/fill/w_39,h_39,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_23e5890c2dfc4a04af80178b43ef66fd~mv2.png"
              alt="LinkedIn"
              className="h-[37px] w-[37px] object-cover hover:scale-110"
            />
          </a>
        </div>
        <div className="hidden md:flex">
          <a
            href="https://www.canadahelps.org/en/dn/27631"
            target="_blank"
            rel="noopener noreferrer"
            className="relative bg-mainBlue text-white border-transparent border-solid border-0 rounded-lg shadow-lg px-5 py-3 hover:bg-amber transition-colors duration-500 ease-in-out flex items-center justify-center"
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
