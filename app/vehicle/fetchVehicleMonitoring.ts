// API Docs: https://511.org/sites/default/files/2022-11/511%20SF%20Bay%20Open%20Data%20Specification%20-%20Transit.pdf
const VEHICLE_MONITORING_ENDPOINT = `https://api.511.org/transit/VehicleMonitoring?api_key=${process.env.NEXT_PUBLIC_TRANSIT_511_API_TOKEN}&agency=SF`;

const fetchVehicleMonitoring = async (
  vehicleID?: number
): Promise<LiveVehicleMonitoringResponse> => {
  const response = await fetch(
    vehicleID
      ? VEHICLE_MONITORING_ENDPOINT + `&vehicleID=${vehicleID}`
      : VEHICLE_MONITORING_ENDPOINT
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const json = await response.json();
  return json;
};

export const getVehicleJourney = (
  vehicleMonitoringResponse: LiveVehicleMonitoringResponse
): MonitoredVehicleJourney | undefined => {
  const vehicleJourney =
    vehicleMonitoringResponse.Siri?.ServiceDelivery?.VehicleMonitoringDelivery?.VehicleActivity?.at(
      0
    )?.MonitoredVehicleJourney;

  return vehicleJourney;
};

export const getStops = (
  vehicleJourney: MonitoredVehicleJourney
): Array<OnwardCall | MonitoredCall> => {
  let stops: Array<OnwardCall | MonitoredCall> = [];

  const monitoredCall = vehicleJourney?.MonitoredCall;
  const onwardCalls = vehicleJourney?.OnwardCalls?.OnwardCall;

  if (monitoredCall) {
    stops = [monitoredCall];
  }
  if (onwardCalls) {
    stops = [...stops, ...onwardCalls];
  }

  return stops;
};

export default fetchVehicleMonitoring;
