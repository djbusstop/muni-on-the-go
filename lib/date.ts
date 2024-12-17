import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const localDate = (datestring: string) => {
  const date = dayjs(datestring);
  return date.tz("America/Los_Angeles");
};
