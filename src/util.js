const timeFormatptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const formatNoteTitle = (title) =>
  new Date(title).toLocaleString("en-US", timeFormatptions);

export const sortNotesByDateTitle = (notes) =>
  notes.sort((a, b) => new Date(b.title) - new Date(a.title));
