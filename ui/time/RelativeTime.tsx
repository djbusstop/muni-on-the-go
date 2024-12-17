export const getRelativeMinutes = (
  scheduledTime: Date,
  expectedTime: Date
): number => {
  return Math.round(
    Math.ceil((expectedTime.getTime() - scheduledTime.getTime()) / 1000 / 60)
  );
};

const RelativeTime = ({
  scheduled,
  expected,
  hideIfOnTime,
}: {
  scheduled: Date;
  expected: Date;
  hideIfOnTime?: boolean;
}) => {
  const minutesDifference = getRelativeMinutes(scheduled, expected);
  if (minutesDifference === 0) {
    if (hideIfOnTime) return null;
    return <span>On time</span>;
  }

  const absoluteDifference = Math.abs(minutesDifference);
  const isEarly = minutesDifference < 0;
  return (
    <span
      style={{
        color: isEarly ? "green" : "#cc2323",
      }}
    >
      {isEarly ? "Early" : "Delayed"} {absoluteDifference}{" "}
      {absoluteDifference === 1 ? "min" : "mins"}{" "}
    </span>
  );
};

export default RelativeTime;
