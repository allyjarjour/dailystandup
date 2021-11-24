const timeFormatptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const formatNoteTitle = (title) =>
  new Date(title).toLocaleString("en-US", timeFormatptions);
