import { Dayjs } from "dayjs";

const HourMin = ({ date }: { date: Dayjs }) => {
  return date.format("HH:mm");
};

export default HourMin;
