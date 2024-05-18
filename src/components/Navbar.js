import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-purple-400 text-white py-2">
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
        <div className="flex space-x-4">
          {/* Place your navigation links here */}
          <Link href="/charts">
            <button className="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none py-2 px-4 rounded">
              Charts
            </button>
          </Link>
          {/* Add more navigation links as needed */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
