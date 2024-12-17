import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const localDate = (datestring: string): Dayjs => {
  return dayjs(datestring).tz("America/Los_Angeles");
};

export const getRelativeMinutes = (
  scheduledTime: Date,
  expectedTime: Date
): number => {
  return Math.round(
    Math.ceil((expectedTime.getTime() - scheduledTime.getTime()) / 1000 / 60)
  );
};
