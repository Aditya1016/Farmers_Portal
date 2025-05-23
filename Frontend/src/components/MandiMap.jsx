import { useRef, useEffect, useState, useCallback } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import axios from "axios";

const Map = () => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const zoom = 14;
  const lastSentTime = useRef(0);

  maptilersdk.config.apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

  // Fly to updated location
  const flyToLocation = useCallback(() => {
    if (map.current) {
      map.current.flyTo({
        center: [location.longitude, location.latitude],
        zoom,
        essential: true,
      });
    }
  }, [location.latitude, location.longitude]);

  // Watch for location updates in real-time
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      console.error("Geolocation is not supported.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setLocation({ latitude: lat, longitude: lon });

        // Move marker on map
        if (marker.current) {
          marker.current.setLngLat([lon, lat]);
        }

        // Update backend every 10 seconds max
        const now = Date.now();
        if (now - lastSentTime.current > 10000) {
          lastSentTime.current = now;

          const userId = localStorage.getItem("userId");
          if (userId) {
            axios
              .patch(`http://localhost:5500/api/v1/users/set-location`, {
                id: userId,
                latitude: lat,
                longitude: lon,
              })
              .catch((err) => console.error("Failed to update location", err));
          }
        }
      },
      (err) => {
        console.error("Error watching location", err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 10000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Initialize the map and marker
  useEffect(() => {
    if (map.current || !location.latitude || !location.longitude) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [location.longitude, location.latitude],
      zoom,
    });

    marker.current = new maptilersdk.Marker({ color: "#FF0000" })
      .setLngLat([location.longitude, location.latitude])
      .addTo(map.current);
  }, [location]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
      <div className="absolute bottom-0 right-0 bg-white mb-8 mr-3 p-1 rounded-full shadow-lg flex items-center justify-center">
        <img
          src="/icons/navigation.png"
          alt="Fly icon"
          className="size-7 cursor-pointer"
          onClick={flyToLocation}
        />
      </div>
    </div>
  );
};

export default Map;
