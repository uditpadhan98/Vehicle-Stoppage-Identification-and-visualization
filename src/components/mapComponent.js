import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from '../assets/marker.png';

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


const MapComponent = ({ path, stoppages }) => {
  // console.log(stoppages);
  return (
    <MapContainer center={[12.9294916,74.9173533]} zoom={11} scrollWheelZoom={false} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polyline positions={path} color="#6698FF" />
      {stoppages.map((stop, index) => (
        <Marker key={index} position={stop.location} icon={customIcon}>
          <Popup>
            <div>
              <p><strong>Reach Time:</strong> {new Date(parseInt(stop.reachTime)).toLocaleString()}</p>
              <p><strong>End Time:</strong> {new Date(parseInt(stop.endTime)).toLocaleString()}</p>
              <p><strong>Duration:</strong> {stop.duration.toFixed(2)} minutes</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
