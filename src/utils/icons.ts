import { Language } from "../types";

interface IconConfig {
  show: boolean;
  src: string;
  tooltip: string;
}

interface SocialIconConfig {
  show: boolean;
  src: string;
  url: string;
}

interface IconsReturn {
  time: string;
  location: string;
  age: string;
  parking: IconConfig;
  coffee: IconConfig;
  toys: IconConfig;
  outdoor: IconConfig;
  scale: IconConfig;
  language: IconConfig;
}

interface SocialIconsReturn {
  fb: SocialIconConfig;
  insta: SocialIconConfig;
  eventbrite: SocialIconConfig;
}

const languageIconMap: Record<string, string> = {
  English: "english.svg",
  French: "french.svg",
  Arabic: "arabic.svg",
  Mandarin: "mandarin.svg",
};

const getIcons = (
  translation: Language,
  Parking: boolean,
  Coffee: boolean,
  WiFi: boolean,
  Outdoor: boolean,
  Language: string,
  Scale: boolean,
  Toys: boolean
): IconsReturn => ({
  time: "time.svg",
  location: "location.svg",
  age: "age.svg",
  parking: {
    show: Parking === true,
    src: "parking.svg",
    tooltip: translation === "fr" ? "Parking Disponible" : "Parking Available",
  },
  coffee: {
    show: Coffee === true,
    src: "coffee.svg",
    tooltip: translation === "fr" ? "Café" : "Coffee",
  },
  toys: {
    show: Toys === true,
    src: "toys.svg",
    tooltip: translation === "fr" ? "Joujouthèque" : "Toy Library",
  },
  // Uncomment if needed
  // wifi: {
  //   show: WiFi === true,
  //   src: "wifi.svg",
  //   tooltip: translation === "fr" ? "WiFi Disponible" : "WiFi Available",
  // },
  // indoor: {
  //   show: Outdoor === false,
  //   src: "indoor.svg",
  //   tooltip: translation === "fr" ? "Intérieur" : "Indoor",
  // },
  outdoor: {
    show: Outdoor === true,
    src: "outdoor.svg",
    tooltip: translation === "fr" ? "Extérieur" : "Outdoor",
  },
  scale: {
    show: Scale === true,
    src: "scale.svg",
    tooltip: translation === "fr" ? "Pèse-bébé" : "Baby Scale",
  },
  language: {
    show: true,
    src: languageIconMap[Language] || "english_french.svg",
    tooltip: Language === "English/French" ? "En/Fr" : Language,
  },
});

const getSocialIcons = (
  FB: string,
  Insta: string,
  Eventbrite: string
): SocialIconsReturn => ({
  fb: {
    show: (FB || "").trim() !== "",
    src: "facebook_color.svg",
    url: (FB || "").trim(),
  },
  insta: {
    show: (Insta || "").trim() !== "",
    src: "instagram_color.svg",
    url: (Insta || "").trim(),
  },
  eventbrite: {
    show: (Eventbrite || "").trim() !== "",
    src: "eventbrite_color.svg",
    url: (Eventbrite || "").trim(),
  },
});

export { getIcons, getSocialIcons };
