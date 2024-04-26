import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  return (
    <div className="flex-col items-center justify-between">
      <div className="mt-8 md:mt-4 md:mb-8 text-left">
        <p>
          Conceived and created by an Ottawa Mom, Ottawa parents now have a new,
          incredibly useful tool to plan EarlyON playgroup outings with their
          children.
        </p>{" "}
        <br />
        <p>
          {" "}
          EarlyON playgroups are an important part of growing up in Ottawa, and
          are often the first opportunity our littles have to head out into the
          world to learn and socialize. Parents can make new friends who are
          also starting a young family, have a safe and welcoming space to ask
          parenting questions and laugh about this crazy new adventure with
          other parents. Each EarlyON has its own unique flavor, and can include
          access to resources such as toy libraries, cool outdoor spaces,
          parenting resources such as books or micro-learning opportunities,
          playgroups in different languages and even free parking or yummy
          snacks!{" "}
        </p>
        <br />
        <p>
          {" "}
          This tool will help parents view playgroups that work with their
          schedule – choose to see what you like, based on time of day, age of
          children, day of the week and other categories that make your visit
          fantastic for you.{" "}
        </p>
        <br />
        <p> Come and PLAY! </p>
      </div>
    </div>
  );
};
