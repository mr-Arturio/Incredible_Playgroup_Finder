import { getNextOccurrence } from "./dateUtils";

const applyFilters = (data, criteria, selectedAddress) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

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
        try {
          const itemDate = item.Date ? new Date(item.Date) : null;
          if (itemDate) itemDate.setHours(0, 0, 0, 0);

          let isUpcomingEvent = false;
          let nextOccurrence = null;
          if (itemDate && itemDate >= today) {
            isUpcomingEvent = true;
          } else if (!itemDate && item.Day && item.Repeats) {
            nextOccurrence = getNextOccurrence(item.Day, item.Repeats);
            isUpcomingEvent = nextOccurrence && nextOccurrence >= today;
          }

          if (!isUpcomingEvent) return false;

          const noOtherCriteria = Object.values(criteria).every(
            (val) => val === ""
          );
          if (noOtherCriteria && selectedAddress === item.Address) return true;

          if (criteria.area && item.Area !== criteria.area) return false;
          if (criteria.language && item.Language !== criteria.language)
            return false;
          if (criteria.day && item.Day !== criteria.day) return false;
          if (criteria.organizer && item.Organizer !== criteria.organizer)
            return false;
          if (criteria.age && item.Age !== criteria.age) return false;

          const { timeCategory } = categorizeTime(item.Time);
          if (criteria.time && timeCategory !== criteria.time) return false;

          const displayDate =
            item.Date || nextOccurrence?.toISOString().split("T")[0] || "";
          if (criteria.date && displayDate !== criteria.date) return false;

          return true;
        } catch (innerError) {
          console.error(
            `Error processing item with ID ${item.ID}: ${innerError.message}`
          );
          return false;
        }
      })
      .sort((a, b) => {
        const { startTime: timeA } = categorizeTime(a.Time);
        const { startTime: timeB } = categorizeTime(b.Time);
        return timeA - timeB; // Ascending order
      });
  } catch (error) {
    console.error("Error applying filters:", error);
    return [];
  }
};

export default applyFilters;
