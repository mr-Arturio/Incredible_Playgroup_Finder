import { useState, useEffect } from "react";
import Image from "next/image";

const RandomImage = () => {
  const [imageData, setImageData] = useState({ src: "", width: 400 });

  useEffect(() => {
    // Generate a random number between 0 and 99 (inclusive)
    const randomNumber = Math.random() * 100;

    if (randomNumber < 40) {
      // 40% chance to display the logo
      setImageData({ src: '/docs/Families/IPF_logo.svg', width: 300 });
    } else {
      // 60% chance to display a random image from 1 to 12
      const randomImageNumber = Math.floor(Math.random() * 12) + 1;
      setImageData({ src: `/docs/Families/${randomImageNumber}.svg`, width: 400 });
    }
  }, []);

  return (
    <Image 
      src={imageData.src} 
      alt="Family Image" 
      width={imageData.width} 
      height={100}
      loading="lazy"
      sizes="(max-width: 768px) 200px, (max-width: 1024px) 300px, 400px"
      quality={90}
    />
  );
};

export default RandomImage;
