const applyFilters = (data, criteria, selectedAddress) => {
  try {
    // Create a date object for today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ensure time portion is zeroed out

    console.log('Today\'s Date:', today.toISOString().split("T")[0]);

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
        // Log the item being processed
        // console.log('Processing item:', item);

        // Check for missing or empty values
        if (!item.Date || !item.Address) {
          console.error(`Missing required property in item with ID ${item.ID}`);
          return false;
        }

        // Date check for past dates using Date objects
        const itemDate = new Date(item.Date);
        itemDate.setHours(0, 0, 0, 0); // Ensure time portion is zeroed out
        // console.log('Item Date:', itemDate.toISOString().split("T")[0]);
        if (itemDate < today) return false;

        // If there's a selected address and no other criteria, return true if the address matches
        const noOtherCriteria = Object.values(criteria).every((val) => val === "");
        // console.log('No Other Criteria:', noOtherCriteria);

        if (noOtherCriteria && selectedAddress === item.Address) return true;

        if (criteria.area && item.Area !== criteria.area) return false;
        if (criteria.language && item.Language !== criteria.language) return false;
        if (criteria.day && item.Day !== criteria.day) return false;
        if (criteria.location && item.Location !== criteria.location) return false;
        if (criteria.age && item.Age !== criteria.age) return false;

        const itemTimeCategory = categorizeTime(item.Time);
        // console.log('Item Time Category:', itemTimeCategory);
        if (criteria.time && itemTimeCategory !== criteria.time) return false;

        // Ensure data is in ISO format 'YYYY-MM-DD'
        if (criteria.date) {
          const itemDateString = itemDate.toISOString().split("T")[0];
          console.log('Item Date String:', itemDateString);
          if (itemDateString !== criteria.date) return false;
        }

        return true;
      } catch (innerError) {
        console.error(`Error processing item with ID ${item.id}: ${innerError.message}`);
        return false;
      }
    });
  } catch (error) {
    console.error(`Error applying filters: ${error.message}`);
    return [];
  }
};

export default applyFilters;
