import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-purple-400 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          {/* Place your navigation links here */}
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          {/* Add more navigation links as needed */}
        </div>
        <div className="logo">
          {/* Assuming you have a logo.png in your public folder */}
          <Image
            src="/PRC_logo_en_caps.png"
            alt="Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
