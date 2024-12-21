import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvent,
  Popup,
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import classes from "./Leaflet.module.css";
import { useEffect } from "react";
import maps from "../Data/Maps";
import georgia from "../../assets/mygeodata/georgia.json";

function Leaflet({ marker, center, zoom, iconUrl,office, popup, flyTo }) {
  const icon = L.icon({
    iconUrl: office,
    iconSize: [50, 50],
    iconAnchor: [15, 20],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  function LocationMarker({ flyTo }) {
    const iconl = L.icon({
      iconUrl: iconUrl,
      iconSize: [50, 50],
      iconAnchor: [15, 20],
      popupAnchor: [1, -34],
    });
    const map = useMapEvent({
      move() {},
    });
    useEffect(() => {
      if (flyTo!=="") {
        map.flyTo(flyTo, 9);
      }else {
        map.flyTo(center,zoom)
      }
    }, [flyTo, map]);

    return flyTo ? (
      <Marker position={flyTo} icon={iconl}>
        <Popup>New Location</Popup>
      </Marker>
    ) : null;
  }

  return (
    <div className={classes.main}>
      <div className={classes.map}>
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution={maps.maptiler.attribution}
            url={maps.maptiler.url}
            maxZoom={20}
          />

          <Marker position={marker} icon={icon}>
            <Popup>{popup}</Popup>
          </Marker>
          <LocationMarker flyTo={flyTo} />

          <GeoJSON data={georgia}></GeoJSON>
        </MapContainer>
      </div>
    </div>
  );
}

export default Leaflet;
