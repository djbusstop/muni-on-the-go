// API Docs: https://511.org/sites/default/files/2022-11/511%20SF%20Bay%20Open%20Data%20Specification%20-%20Transit.pdf
const SCHEDULED_DEPARTURES_ENDPOINT = `https://api.511.org/transit/stoptimetable?api_key=${process.env.NEXT_PUBLIC_TRANSIT_511_API_TOKEN}&OperatorRef=SF`;

const fetchScheduledDepartures = async (
  stopId: string | number,
  arrivalTime?: string
): Promise<ScheduledDeparturesResponse> => {
  // Sets time to 5 min before and 15 min after arrival time, or the next 20 min
  let time;
  if (arrivalTime) {
    time = new Date(arrivalTime);
    time.setMinutes(time.getMinutes() - 5);
  } else {
    time = new Date();
  }
  const startTime = time.toUTCString();
  time.setMinutes(time.getMinutes() + 20);
  const endTime = time.toUTCString();

  const response = await fetch(
    SCHEDULED_DEPARTURES_ENDPOINT +
      `&MonitoringRef=${stopId}&StartTime=${startTime}&EndTime=${endTime}`
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const json = await response.json();
  return json;
};
export default fetchScheduledDepartures;
