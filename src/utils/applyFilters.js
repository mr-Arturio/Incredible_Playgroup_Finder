import { getNextOccurrence } from "./dateUtils";

const applyFilters = (data, criteria, selectedAddress) => {
  try {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    console.log("Today's Date (UTC):", today.toISOString().split("T")[0]);
    console.log("Filter Criteria:", criteria);

    const categorizeTime = (timeString) => {
      if (!timeString || !timeString.includes(" - ")) {
        console.error(`Invalid time format: ${timeString}`);
        throw new Error(`Invalid time format: ${timeString}`);
      }

      const [startTimeString] = timeString.split(" - ");
      const [hours, minutes] = startTimeString.split(":").map(Number);
      const startTime = (hours || 0) * 100 + (minutes || 0);

      if (isNaN(startTime)) {
        console.error(`Invalid time format: ${timeString}`);
        throw new Error(`Invalid time format: ${timeString}`);
      }

      if (startTime < 1200) return "Morning";
      if (startTime >= 1200 && startTime < 1600) return "Afternoon";
      if (startTime >= 1600) return "Evening";
    };

    return data.filter((item) => {
      try {
        const itemDate = item.Date ? new Date(item.Date) : null;
        if (itemDate) itemDate.setUTCHours(0, 0, 0, 0);

        let isUpcomingEvent = false;
        let nextOccurrence = null;
        if (itemDate && itemDate >= today) {
          isUpcomingEvent = true;
        } else if (!itemDate && item.Day && item.Repeats) {
          nextOccurrence = getNextOccurrence(item.Day, item.Repeats);
          isUpcomingEvent = nextOccurrence && nextOccurrence >= today;
        }

        // console.log("Item ID:", item.ID, "Is Upcoming:", isUpcomingEvent, "Item Date:", item.Date, "Day:", item.Day, "Repeats:", item.Repeats, "Next Occurrence:", nextOccurrence);

        if (!isUpcomingEvent) return false;

        const noOtherCriteria = Object.values(criteria).every((val) => val === "");
        if (noOtherCriteria && selectedAddress === item.Address) return true;

        if (criteria.area && item.Area !== criteria.area) return false;
        if (criteria.language && item.Language !== criteria.language) return false;
        if (criteria.day && item.Day !== criteria.day) return false;
        if (criteria.organizer && item.Organizer !== criteria.organizer) return false;
        if (criteria.age && item.Age !== criteria.age) return false;

        const itemTimeCategory = categorizeTime(item.Time);
        if (criteria.time && itemTimeCategory !== criteria.time) return false;

        const displayDate = item.Date || nextOccurrence?.toISOString().split("T")[0] || "";
        // console.log("Item ID:", item.ID, "Display Date:", displayDate, "Criteria Date:", criteria.date);

        if (criteria.date && displayDate !== criteria.date) return false;

        return true;
      } catch (innerError) {
        console.error(`Error processing item with ID ${item.ID}: ${innerError.message}`);
        return false;
      }
    });
  } catch (error) {
    console.error(`Error applying filters: ${error.message}`);
    return [];
  }
};

export default applyFilters;

