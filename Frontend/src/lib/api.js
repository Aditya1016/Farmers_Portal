export async function getLocation() {
  try {
    const response = await fetch("http://ip-api.com/json/");
    const json = (await response.json());
    if (typeof json.lat === "number" && typeof json.lon === "number") {
      return [json.lon, json.lat];
    }
  } catch (e) {
    console.log("Failed to get location", e);
  }
  return [0, 0];
}