const getIcons = (language, Parking, Coffee, WiFi, Outdoor, Language, Scale) => ({
  time: "time.svg",
  location: "location.svg",
  age: "age.svg",
  parking: {
    show: Parking === "Yes",
    src: "parking.svg",
    tooltip: language === "fr" ? "Parking Disponible" : "Parking Available",
  },
  coffee: {
    show: Coffee === "Yes",
    src: "coffee.svg",
    tooltip: language === "fr" ? "Café" : "Coffee",
  },
  // Uncomment if needed
  // wifi: {
  //   show: WiFi === "Yes",
  //   src: "wifi.svg",
  //   tooltip: language === "fr" ? "WiFi Disponible" : "WiFi Available",
  // },
  // indoor: {
  //   show: Outdoor === "No",
  //   src: "indoor.svg",
  //   tooltip: language === "fr" ? "Intérieur" : "Indoor",
  // },
  outdoor: {
    show: Outdoor === "Yes",
    src: "outdoor.svg",
    tooltip: language === "fr" ? "Extérieur" : "Outdoor",
  },
  scale: {
    show: Scale === "Yes",
    src: "scale.svg",
    tooltip: language === "fr" ? "Pèse-bébé" : "Baby Scale",
  },
  // Assuming Language should always be shown; adjust if needed
  language: {
    show: true,
    src: `${Language.toLowerCase()}.svg`, // Dynamic path to your language icon
    tooltip: Language,
  },
});

const getSocialIcons = (FB, Insta, Eventbrite) => ({
  fb: {
    show: FB.trim() !== "", // Show icon if FB is not empty
    src: "facebook_color.svg",
    url: FB.trim(),
  },
  insta: {
    show: Insta.trim() !== "", // Show icon if Insta is not empty
    src: "instagram_color.svg",
    url: Insta.trim(),
  },
  eventbrite: {
    show: Eventbrite.trim() !== "", // Show icon if Eventbrite is not empty
    src: "eventbrite_color.svg",
    url: Eventbrite.trim(),
  },
});

export { getIcons, getSocialIcons };
