export const getTimeLeftString = (timestamp: number) => {
  const now = Date.now(); // Current time in ms
  const future = timestamp * 1000; // Convert seconds to ms
  const diff = future - now;

  if (diff <= 0) return "Expired";

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  let timeLeft = "";
  if (days) timeLeft += `${days}d `;
  if (hours) timeLeft += `${hours}h `;
  if (minutes) timeLeft += `${minutes}m `;
  if (seconds && !days) timeLeft += `${seconds}s`;

  return timeLeft.trim() + " left";
};
