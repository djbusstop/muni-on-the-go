// API Docs: https://511.org/sites/default/files/2022-11/511%20SF%20Bay%20Open%20Data%20Specification%20-%20Transit.pdf
const STOP_ENDPOINT = `https://api.511.org/transit/stops?api_key=${process.env.NEXT_PUBLIC_TRANSIT_511_API_TOKEN}&operator_id=SF`;

const fetchStops = async (): Promise<StopsResponse> => {
  // Cache stops response for an hour
  const response = await fetch(STOP_ENDPOINT, {
    cache: "force-cache",
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const json = await response.json();
  return json;
};

export default fetchStops;
