import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  return (
    <div className="flex-col items-center justify-between">
      <div className="flex flex-col items-center justify-between md:flex-row md:items-center">
      <Image
          src="/Play_Goup.png"
          alt="Play Group"
          width={200}
          height={200}
        />
              <h1 className="text-4xl font-bold text-center mt-4">
        Welcome to the Incredible Playgroup Finder!
      </h1>
        <Link href="/charts">
          <button className="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none py-2 px-4 rounded">
            Charts
          </button>
        </Link>

      </div>

      <p className="mt-8 md:mt-4 md:mb-8 text-left">
        Conceived and created by an Ottawa Mom, Ottawa parents now have a new,
        incredibly useful tool to plan EarlyON playgroup outings with their
        children. EarlyON playgroups are an important part of growing up in
        Ottawa, and are often the first opportunity our littles have to head out
        into the world to learn and socialize. Parents can make new friends who
        are also starting a young family, have a safe and welcoming space to ask
        parenting questions and laugh about this crazy new adventure with other
        parents. Each EarlyON has its own unique flavor, and can include access
        to resources such as toy libraries, cool outdoor spaces, parenting
        resources such as books or micro-learning opportunities, playgroups in
        different languages and even free parking or yummy snacks! This tool
        will help parents view playgroups that work with their schedule – choose
        to see what you like, based on time of day, age of children, day of the
        week and other categories that make your visit fantastic for you. Come
        out to PLAY!
      </p>
    </div>
  );
};
