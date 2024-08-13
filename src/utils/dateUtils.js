export const getNextOccurrences = (dayOfWeek, repeats) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time portion to midnight

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const dayIndex = daysOfWeek.indexOf(dayOfWeek);

  if (dayIndex === -1) return null;

  const currentDayIndex = today.getDay();
  let nextOccurrence = new Date(today);

  // Calculate the next occurrence for weekly events
  nextOccurrence.setDate(today.getDate() + ((dayIndex - currentDayIndex + 7) % 7));

  if (repeats === "Weekly") {
    return nextOccurrence;
  } 

  return null;
};
