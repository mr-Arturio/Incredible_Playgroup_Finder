import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ImageData {
  src: string;
  width: number;
}

const RandomImage: React.FC = () => {
  const [imageData, setImageData] = useState<ImageData>({
    src: "",
    width: 400,
  });

  useEffect(() => {
    // Generate a random number between 0 and 99 (inclusive)
    const randomNumber = Math.random() * 100;

    if (randomNumber < 40) {
      // 40% chance to display the logo
      setImageData({ src: "/docs/Families/IPF_logo.svg", width: 300 });
    } else {
      // 60% chance to display a random image from 1 to 12
      const randomImageNumber = Math.floor(Math.random() * 12) + 1;
      setImageData({
        src: `/docs/Families/${randomImageNumber}.svg`,
        width: 400,
      });
    }
  }, []);

  return (
    <Image
      src={imageData.src}
      alt="Family Image"
      width={imageData.width}
      height={100}
    />
  );
};

export default RandomImage;
