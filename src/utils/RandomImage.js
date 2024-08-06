import Image from "next/image";

const RandomImage = () => {
  // Generate a random number between 1 and 16
  const randomNumber = Math.floor(Math.random() * 16) + 1;
  // Set the image source based on the random number
  const randomImage = `/docs/Families/${randomNumber}.svg`;

  return (
    <Image
      src={randomImage}
      alt={`Family Image ${randomNumber}`}
      width={370}
      height={370}
    />
  );
};

export default RandomImage;
