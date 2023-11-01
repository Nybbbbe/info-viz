import { useState } from 'react'
import './App.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
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
      <MapContainer style={{"height": "100%"}} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {powerPlantData.map(powerPlant => {
          return (
            <Marker position={[powerPlant.latitude, powerPlant.longitude]}>
              <Popup>
                {powerPlant.name} in {powerPlant.country_long} <br /> Poweplant type: {powerPlant.primary_fuel}
              </Popup>
            </Marker>
              )
        })}
        
      </MapContainer>
    </>
  )
}

export default App
