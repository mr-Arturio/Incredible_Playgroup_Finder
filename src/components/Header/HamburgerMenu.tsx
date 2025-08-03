import React from "react";
import Link from "next/link";
import { FiX } from "react-icons/fi";

interface HamburgerMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  isOpen,
  toggleMenu,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-purple-800 z-50 flex flex-col items-center justify-center">
      <button onClick={toggleMenu} className="absolute top-5 right-5">
        <FiX className="text-white text-4xl" />
      </button>
      <div className="flex flex-col space-y-6 text-white text-2xl">
        <Link href="https://www.parentresource.ca/" onClick={toggleMenu}>
          Home
        </Link>
        <Link href="https://www.parentresource.ca/about" onClick={toggleMenu}>
          About Us
        </Link>
        <Link
          href="https://www.parentresource.ca/copy-of-our-impact"
          onClick={toggleMenu}
        >
          Get Involved
        </Link>
        <Link
          href="https://www.parentresource.ca/programs"
          onClick={toggleMenu}
        >
          Parents
        </Link>
        <Link
          href="https://www.parentresource.ca/professionals"
          onClick={toggleMenu}
        >
          Professionals
        </Link>
        <Link href="https://www.parentresource.ca/blog" onClick={toggleMenu}>
          Blog
        </Link>
        <Link
          href="https://www.parentresource.ca/volunteering"
          onClick={toggleMenu}
        >
          Contact
        </Link>
      </div>
    </div>
  );
};

export default HamburgerMenu;
