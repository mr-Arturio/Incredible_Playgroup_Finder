export const getNextOccurrence = (dayOfWeek, repeats) => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0); // Ensure time portion is zeroed out in UTC

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayIndex = daysOfWeek.indexOf(dayOfWeek);

  if (dayIndex === -1) return null;

  const currentDayIndex = today.getUTCDay();
  let nextOccurrence = new Date(today);

  // Calculate the next occurrence for weekly events
  nextOccurrence.setUTCDate(today.getUTCDate() + ((dayIndex - currentDayIndex + 7) % 7));

  if (repeats === "Weekly") {
    return nextOccurrence;
  } else if (repeats === "Bi-Weekly") {
    nextOccurrence.setUTCDate(nextOccurrence.getUTCDate() + 7);
    return nextOccurrence;
  } else if (repeats === "Monthly") {
    nextOccurrence.setUTCDate(1); // Set to the first day of the month
    nextOccurrence.setUTCMonth(today.getUTCMonth() + 1);

    // Find the first occurrence of the specified day in the next month
    while (nextOccurrence.getUTCDay() !== dayIndex) {
      nextOccurrence.setUTCDate(nextOccurrence.getUTCDate() + 1);
    }
    return nextOccurrence;
  }

  return null;
};
