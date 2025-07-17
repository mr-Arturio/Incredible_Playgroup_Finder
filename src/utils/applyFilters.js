import { translationMappings } from "../utils/translationMappings";

const applyFilters = (data, criteria, translation) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of the day in local time

    // Function to translate filter criteria from French to English
    const translateCriteria = (value) => {
      if (translation === "fr" && translationMappings.fr[value]) {
        return translationMappings.fr[value];
      }
      return value;
    };

    const translatedCriteria = {
      area: translateCriteria(criteria.area, "area"),
      language: translateCriteria(criteria.language, "language"),
      day: translateCriteria(criteria.day, "day"),
      organizer: criteria.organizer,
      age: translateCriteria(criteria.age, "age"),
      time: translateCriteria(criteria.time, "time"),
      date: criteria.date,
      address: criteria.address,
    };

    const parseDate = (dateString) => {
      if (!dateString) return null;

  // If already a Date object, just return it normalized
  if (dateString instanceof Date) {
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  // If it looks like a natural date string (already has time zone info), don’t append T00:00:00
  const looksLikeNaturalDate = /\d{4}/.test(dateString) && dateString.includes("GMT");
  const date = new Date(
    looksLikeNaturalDate ? dateString : dateString.trim() + "T00:00:00"
  );

  if (isNaN(date.getTime())) {
    console.error(`❌ Invalid date string: "${dateString}"`);
    return null;
  }

  date.setHours(0, 0, 0, 0);
  return date;
};

    const categorizeTime = (timeString) => {
      if (!timeString || !timeString.includes(" - ")) {
        return { startTime: null, timeCategory: "No Time Specified" };
      }
      const [startTimeString] = timeString.split(" - ");
      const [hours, minutes] = startTimeString.split(":").map(Number);
      const startTime = (hours || 0) * 100 + (minutes || 0);
      let timeCategory;
      if (startTime < 1200) {
        timeCategory = "Morning";
      } else if (startTime >= 1200 && startTime < 1600) {
        timeCategory = "Afternoon";
      } else {
        timeCategory = "Evening";
      }
      return { startTime, timeCategory };
    };

    // Mapping for hierarchical age filters
    const ageMapping = {
      "Baby (0-24m)": [
        "Baby (0-24m)",
        "Baby (0-18m)",
        "Baby (0-12m)",
        "Baby (non-walking)",
      ],
      "Baby (0-18m)": ["Baby (0-18m)", "Baby (0-12m)", "Baby (non-walking)"],
      "Child (0-6y)": [
        "Child (0-6y)",
        "Child (3-6y)",
        "Baby (0-24m)",
        "Baby (0-18m)",
        "Baby (0-12m)",
        "Baby (non-walking)",
      ],
    };

    // Mapping for language filter logic
    const languageMapping = {
      English: ["English", "EN/FR"],
      French: ["French", "EN/FR"],
    };

    return data
      .filter((item) => {
        if (criteria.address && item.Address !== criteria.address) {
          return false;
        }

        const itemDate = parseDate(item.eventDate);
        let isUpcomingEvent = false;
        if (itemDate) {
          isUpcomingEvent = itemDate >= today;
        } else if (!item.eventDate && !item.Day) {
          isUpcomingEvent = true;
        }

        if (!isUpcomingEvent) return false;

        if (translatedCriteria.area && item.Area !== translatedCriteria.area)
          return false;

        // Handle language mapping logic
        const validLanguages = languageMapping[translatedCriteria.language] || [
          translatedCriteria.language,
        ];
        if (
          translatedCriteria.language &&
          !validLanguages.includes(item.Language)
        )
          return false;

        if (translatedCriteria.day && item.Day !== translatedCriteria.day)
          return false;

        if (
          translatedCriteria.organizer &&
          item.Organizer !== translatedCriteria.organizer
        )
          return false;

        // Handle age mapping logic
        const validAges = ageMapping[translatedCriteria.age] || [
          translatedCriteria.age,
        ];
        if (translatedCriteria.age && !validAges.includes(item.Age))
          return false;

        const { timeCategory } = categorizeTime(item.Time);
        if (translatedCriteria.time && timeCategory !== translatedCriteria.time)
          return false;

        const displayDate = item.eventDate || "";
        if (translatedCriteria.date && displayDate !== translatedCriteria.date)
          return false;

        return isUpcomingEvent;
      })
      .sort((a, b) => {
        const { startTime: timeA } = categorizeTime(a.Time);
        const { startTime: timeB } = categorizeTime(b.Time);

        const isPausedA = a.Paused === "yes";
        const isPausedB = b.Paused === "yes";

        // If one is paused and the other is not, move paused one to the bottom
        if (isPausedA && !isPausedB) return 1;
        if (!isPausedA && isPausedB) return -1;

        if (timeA === null) return 1;
        if (timeB === null) return -1;
        return timeA - timeB;
      });
  } catch (error) {
    console.error("Error applying filters:", error);
    return [];
  }
};

export default applyFilters;
