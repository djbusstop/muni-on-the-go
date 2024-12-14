// API Docs: https://511.org/sites/default/files/2022-11/511%20SF%20Bay%20Open%20Data%20Specification%20-%20Transit.pdf
const STOP_MONITORING_ENDPOINT = `https://api.511.org/transit/StopMonitoring?api_key=${process.env.NEXT_PUBLIC_TRANSIT_511_API_TOKEN}&agency=SF`;

const fetchStopMonitoring = async (
  stopCode?: string | number
): Promise<LiveStopMonitoringResponse> => {
  const response = await fetch(
    stopCode
      ? STOP_MONITORING_ENDPOINT + `&stopCode=${stopCode}`
      : STOP_MONITORING_ENDPOINT
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const json = await response.json();
  return json;
};

export default fetchStopMonitoring;
