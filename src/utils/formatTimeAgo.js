import { formatDistanceToNow } from "date-fns";

export const formatTimeAgo = (date) => {
  let distance = formatDistanceToNow(new Date(date), { addSuffix: true });
  distance = distance.replace("about ", ""); // Remove the word "about"
  const [value, unit] = distance.split(" ");

  console.log(unit);
  console.log(value);

  // if (unit.startsWith("minute")) return `${value}min ago`;
  if (unit.startsWith("second")) return `now`;
  if (unit.startsWith("minute")) return `${value}min ago`;
  if (unit.startsWith("hour")) return `${value}h ago`;
  if (unit.startsWith("day")) return `${value}d ago`;
  if (unit.startsWith("month")) return `${value}mo ago`;
  if (unit.startsWith("year")) return `${value} years ago`;
  if (unit.startsWith("less") || unit.startsWith("than")) return `now`;

  return distance;
};
