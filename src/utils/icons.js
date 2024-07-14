const getIcons = (Parking, Coffee, WiFi, Outdoor, Language, Scale) => ({
  time: "time.svg",
  location: "location.svg",
  age: "age.svg",
  parking: {
    show: Parking === "Yes",
    src: "parking.svg",
    tooltip: "Parking Available",
  },
  coffee: {
    show: Coffee === "Yes",
    src: "coffee.svg",
    tooltip: "Coffee",
  },
  // Uncomment if needed
  // wifi: {
  //   show: WiFi === "Yes",
  //   src: "wifi.svg",
  //   tooltip: "WiFi Available",
  // },
  indoor: {
    show: Outdoor === "No",
    src: "indoor.svg",
    tooltip: "Indoor",
  },
  outdoor: {
    show: Outdoor === "Yes",
    src: "outdoor.svg",
    tooltip: "Outdoor",
  },
  scale: {
    show: Scale === "Yes",
    src: "scale.svg",
    tooltip: "Baby Scale",
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
    tooltip: "Facebook",
  },
  insta: {
    show: Insta.trim() !== "", // Show icon if Insta is not empty
    src: "instagram_color.svg",
    tooltip: "Instagram",
  },
  eventbrite: {
    show: Eventbrite.trim() !== "", // Show icon if Eventbrite is not empty
    src: "eventbrite_color.svg",
    tooltip: "Eventbrite",
  },
});

export { getIcons, getSocialIcons };
