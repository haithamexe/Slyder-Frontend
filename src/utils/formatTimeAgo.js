import { formatDistanceToNow } from "date-fns";

export const formatTimeAgo = (date) => {
  let distance = formatDistanceToNow(new Date(date), { addSuffix: true });
  distance = distance.replace("about ", ""); // Remove the word "about"
  const [value, unit] = distance.split(" ");

  if (unit.startsWith("minute")) return `${value}min ago`;
  if (unit.startsWith("hour")) return `${value}h ago`;
  if (unit.startsWith("day")) return `${value}d ago`;
  if (unit.startsWith("month")) return `${value}mo ago`;
  if (unit.startsWith("year")) return `${value} years ago`;

  return distance;
};
