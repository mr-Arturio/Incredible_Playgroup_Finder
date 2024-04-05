import React from "react";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="flex-col items-center justify-between">
      <Link href="/charts">
        <button className="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none py-2 px-4 rounded">
          Charts
        </button>
      </Link>
      <p className="mt-8 md:mt-4 md:mb-8 text-left">
        Ut sint laboris nostrud voluptate veniam dolore dolor duis magna ex.
        Reprehenderit velit minim labore cillum. Ullamco ut ipsum deserunt sunt.
        Incididunt amet nulla non elit qui mollit aliqua est Lorem duis. Labore
        elit sint ipsum magna. Quis nulla excepteur consequat duis cupidatat
        adipisicing eiusmod fugiat laborum in occaecat. Officia dolor
        reprehenderit dolore aliqua esse mollit proident irure laboris voluptate
        laboris. Laboris id amet adipisicing eu ipsum commodo eiusmod est veniam
        proident excepteur adipisicing. Aliquip Lorem id ullamco velit dolore
        nisi.
      </p>
    </div>
  );
};
