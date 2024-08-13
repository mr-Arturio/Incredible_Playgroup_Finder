import { getNextOccurrences } from "./dateUtils";

const applyFilters = (data, criteria, selectedAddress) => {
  try {
    console.log("Fetched Data:", data);

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of the day in local time

    console.log("Today's Date (Local):", today.toISOString().split("T")[0]);

    const parseDate = (dateString) => {
      if (!dateString) return null;
      const date = new Date(dateString.trim() + 'T00:00:00'); // Ensure time part is set
      if (isNaN(date.getTime())) {
        console.error(`Invalid date string: "${dateString}"`);
        return null;
      }
      date.setHours(0, 0, 0, 0); // Normalize to start of the day
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

    return data
      .filter((item) => {
        console.log(`BEFORE Processing item with ID ${item.ID}`);
        console.log(`Fetched Item Data:`, item);
        console.log(`EVENT Date:`, item.eventDate);

        const itemDate = parseDate(item.eventDate);
        console.log(`Processing item with ID ${item.ID}`);
        console.log("Item Event Date:", itemDate ? itemDate.toISOString().split("T")[0] : "null");

        let isUpcomingEvent = false;
        let nextOccurrence = null;

        if (itemDate) {
          isUpcomingEvent = itemDate >= today;
          console.log("Event is", isUpcomingEvent ? "upcoming" : "past", "based on itemDate");
        } else if (!itemDate && item.Day && item.Repeats) {
          nextOccurrence = getNextOccurrences(item.Day, item.Repeats);
          console.log("Next Occurrence:", nextOccurrence?.toISOString().split("T")[0]);
          isUpcomingEvent = nextOccurrence && nextOccurrence >= today;
          console.log("Event is", isUpcomingEvent ? "upcoming" : "past", "based on nextOccurrence");
        } else if (!item.eventDate && !item.Day && !item.Repeats) {
          isUpcomingEvent = true;
          console.log("Event is included due to missing date, day, and repeats");
        }

        console.log("Is Upcoming Event:", isUpcomingEvent);
        if (!isUpcomingEvent) return false;

        const noOtherCriteria = Object.values(criteria).every(
          (val) => val === ""
        );
        if (noOtherCriteria && selectedAddress === item.Address) return true;

        if (criteria.area && item.Area !== criteria.area) return false;
        if (criteria.language && item.Language !== criteria.language) return false;
        if (criteria.day && item.Day !== criteria.day) return false;
        if (criteria.organizer && item.Organizer !== criteria.organizer) return false;
        if (criteria.age && item.Age !== criteria.age) return false;

        const { timeCategory } = categorizeTime(item.Time);
        if (criteria.time && timeCategory !== criteria.time) return false;

        const displayDate =
          item.eventDate || nextOccurrence?.toISOString().split("T")[0] || "";
        if (criteria.date && displayDate !== criteria.date) return false;

        return isUpcomingEvent;
      })
      .sort((a, b) => {
        const { startTime: timeA } = categorizeTime(a.Time);
        const { startTime: timeB } = categorizeTime(b.Time);
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
