export default function Progress({
  start,
  duration,
}: {
  start: number;
  duration: number;
}) {
  return (
    <>
      {start},{duration}
    </>
  );
}
