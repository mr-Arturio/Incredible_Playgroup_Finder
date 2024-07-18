import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="flex justify-between ">
      <p className="ml-5 my-1">
        {" "}
        © 2024 Project - Built by{" "}
        <a href="https://github.com/mr-Arturio"> Artur</a>{" "}
      </p>
      <Link href="/charts">
        <p className="text-mainBlue hover:text-hoverBlue mr-5 my-1">Charts</p>
      </Link>
    </footer>
  );
};
