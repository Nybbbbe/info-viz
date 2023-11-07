import { useState } from 'react'
import './App.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from "react-leaflet-cluster";
import power_plant_database from './power_plant_database.json';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';

interface PowerPlant {
  country_long: string,
  name: string,
  capacity_mw: number,
  latitude: number,
  longitude: number,
  primary_fuel: string,
  commissioning_year: number | null
}

const powerPlantData = power_plant_database as PowerPlant[]

function App() {
  // const [count, setCount] = useState(0)

  const getPowerPlantIcon = (type: string, iconUrl?: string): L.DivIcon => {
    const className = type.toLowerCase();
    const markerHtml = `<div class="custom-marker ${className}">
                          ${iconUrl ? `<img src="${iconUrl}" class="icon" />` : ''}
                          <div class="marker-dot"></div>
                       </div>`;
  
    const markerIcon = L.divIcon({
      className: 'custom-marker-icon',
      html: markerHtml,
      iconAnchor: [16, 37], // icon center point
      popupAnchor: [0, -30] // popup placement relative to the icon
    });

    return markerIcon;
  }
  

  return (
    <>
      <MapContainer style={{"height": "100%"}} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup chunkedLoading>
        {powerPlantData.map((powerPlant, index) => {
          return (
            <Marker key={index} position={[powerPlant.latitude, powerPlant.longitude]}>
              <Popup>
                {powerPlant.name} in {powerPlant.country_long} <br /> Power plant type: {powerPlant.primary_fuel}
              </Popup>
            </Marker>
              )
        })}
        </MarkerClusterGroup>
        
      </MapContainer>
    </>
  )
}

export default App
