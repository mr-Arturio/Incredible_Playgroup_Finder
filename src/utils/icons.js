const getIcons = (Parking, Coffee, WiFi, Outdoor, Language, Scale, lng) => ({
  time: `/time.svg`,
  location: `/location.svg`,
  age: `/age.svg`,
  parking: {
    show: Parking === "Yes",
    src: "/parking.svg",
    tooltip: "Parking Available",
  },
  coffee: {
    show: Coffee === "Yes",
    src: `/coffee.svg`,
    tooltip: "Coffee",
  },
  // wifi: {
  //   show: WiFi === "Yes",
  //   src: `/${lng}/wifi.svg`,
  //   tooltip: "WiFi Available",
  // },
  indoor: {
    show: Outdoor === "No",
    src: `/indoor.svg`,
    tooltip: "Indoor",
  },
  outdoor: {
    show: Outdoor === "Yes",
    src: `/outdoor.svg`,
    tooltip: "Outdoor",
  },
  scale: {
    show: Scale === "Yes",
    src: `/scale.svg`,
    tooltip: "Baby Scale",
  },
  // Assuming Language should always be shown; adjust if needed
  language: {
    show: true,
    src: `${Language.toLowerCase()}.svg`, // Dynamic path to your language icon
    tooltip: Language,
  },
});

export default getIcons;
