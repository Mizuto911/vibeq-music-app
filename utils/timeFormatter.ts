export default function timeFormatter(seconds: number) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);

  const paddedMinutes = String(min).padStart(2, "0");
  const paddedSeconds = String(sec).padStart(2, "0");

  return `${paddedMinutes}:${paddedSeconds}`;
}
