import { useState } from 'react'
import './App.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from "react-leaflet-cluster";
import power_plant_database from './power_plant_database.json';

interface PowerPlant {
  country_long: String,
  name: String,
  capacity_mw: number,
  latitude: number,
  longitude: number,
  primary_fuel: String,
  commissioning_year: number | null
}

const powerPlantData = power_plant_database as PowerPlant[]

function App() {
  // const [count, setCount] = useState(0)

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
