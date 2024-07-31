const languageIconMap = {
  English: "english.svg",
  French: "french.svg",
  Arabic: "arabic.svg",
  Mandarin: "mandarin.svg",
};

const getIcons = (
  translation,
  Parking,
  Coffee,
  WiFi,
  Outdoor,
  Language,
  Scale
) => ({
  time: "time.svg",
  location: "location.svg",
  age: "age.svg",
  parking: {
    show: Parking === "Yes",
    src: "parking.svg",
    tooltip: translation === "fr" ? "Parking Disponible" : "Parking Available",
  },
  coffee: {
    show: Coffee === "Yes",
    src: "coffee.svg",
    tooltip: translation === "fr" ? "Café" : "Coffee",
  },
  // Uncomment if needed
  // wifi: {
  //   show: WiFi === "Yes",
  //   src: "wifi.svg",
  //   tooltip: translation === "fr" ? "WiFi Disponible" : "WiFi Available",
  // },
  // indoor: {
  //   show: Outdoor === "No",
  //   src: "indoor.svg",
  //   tooltip: translation === "fr" ? "Intérieur" : "Indoor",
  // },
  outdoor: {
    show: Outdoor === "Yes",
    src: "outdoor.svg",
    tooltip: translation === "fr" ? "Extérieur" : "Outdoor",
  },
  scale: {
    show: Scale === "Yes",
    src: "scale.svg",
    tooltip: translation === "fr" ? "Pèse-bébé" : "Baby Scale",
  },
  // Assuming Language should always be shown; adjust if needed
  language: {
    show: true,
    src: languageIconMap[Language] || "english_french.svg",
    tooltip: Language === "English/French" ? "En/Fr" : Language,
  },
});

const getSocialIcons = (FB, Insta, Eventbrite) => ({
  fb: {
    show: (FB || "").trim() !== "", // Show icon if FB is not empty
    src: "facebook_color.svg",
    url: (FB || "").trim(),
  },
  insta: {
    show: (Insta || "").trim() !== "", // Show icon if Insta is not empty
    src: "instagram_color.svg",
    url: (Insta || "").trim(),
  },
  eventbrite: {
    show: (Eventbrite || "").trim() !== "", // Show icon if Eventbrite is not empty
    src: "eventbrite_color.svg",
    url: (Eventbrite || "").trim(),
  },
});

export { getIcons, getSocialIcons };
