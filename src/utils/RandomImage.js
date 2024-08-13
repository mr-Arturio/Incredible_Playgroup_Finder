import { useState, useEffect } from "react";
import Image from "next/image";

const RandomImage = () => {
  const [randomImage, setRandomImage] = useState("");

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 12) + 1;
    setRandomImage(`/docs/Families/${randomNumber}.svg`);
  }, []);

  return (
    <Image src={randomImage} alt="Family Image" width={400} height={100} />
  );
};

export default RandomImage;
