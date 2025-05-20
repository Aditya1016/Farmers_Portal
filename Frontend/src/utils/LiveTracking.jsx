import { Map } from "@vis.gl/react-maplibre";

import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import "maplibre-gl/dist/maplibre-gl.css";
import YouAreHere from "./YouAreHere";

export default function MapView() {
  const mapStyle = useSelector((s) => s.mapStyle);
  const viewState = useSelector((s) => s.viewState);
  const dispatch = useDispatch();

  const onMove = useCallback(
    (evt) => {
      dispatch({ type: "setViewState", payload: evt.viewState });
    },
    [dispatch]
  );

  return (
    <div className="h-full w-full">
      <Map
        {...viewState}
        onMove={onMove}
        style={{ width: 1525, height: 600 }}
        mapStyle={mapStyle}
        markers
      >
        <YouAreHere />
      </Map>
    </div>
  );
}
