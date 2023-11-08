/// <reference types="vite-plugin-svgr/client" />
import { useState } from 'react'
import './App.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import power_plant_database from './power_plant_database_small.json'
import L from 'leaflet'

import {
    biomass,
    cogeneration,
    gas,
    hydro,
    nuclear,
    oil,
    solar,
    wind,
} from './assets/icons'

// import biomass from './assets/biomass.svg?react'
// // @ts-ignore
// import cogeneration from './assets/cogeneration.svg?react'
// // @ts-ignore
// import gas from './assets/gas.svg?react'
// // @ts-ignore
// import hydro from './assets/hydro.svg?react'
// // @ts-ignore
// import nuclear from './assets/nuclear.svg?react'
// // @ts-ignore
// import oil from './assets/oil.svg?react'
// // @ts-ignore
// import solar from './assets/solar.svg?react'
// // @ts-ignore
// import wind from './assets/wind.svg?react'

interface PowerPlant {
    country_long: string
    name: string
    capacity_mw: number
    latitude: number
    longitude: number
    primary_fuel: string
    commissioning_year: number | null
}

const powerPlantData = power_plant_database as PowerPlant[]

const existingIcons: { [id: string]: string } = {
    biomass: biomass(),
    cogeneration: cogeneration(),
    gas: gas(),
    hydro: hydro(),
    nuclear: nuclear(),
    oil: oil(),
    solar: solar(),
    wind: wind(),
}

const App = () => {
    // const [count, setCount] = useState(0)

    const getPowerPlantIcon = (type: string): L.DivIcon => {
        const className = type.toLowerCase()
        if (className in existingIcons) {
            const markerHtml = `<div class="custom-marker ${className}">
                <div class="icon">
                    ${existingIcons[className]}
                </div>
                <div class="marker-dot"></div>
            </div>`

            const markerIcon = L.divIcon({
                className: 'custom-marker-icon',
                html: markerHtml,
                iconAnchor: [16, 37], // icon center point
                popupAnchor: [0, -30], // popup placement relative to the icon
            })
            return markerIcon
        } else {
            const markerHtml = `<div class="custom-marker ${className}">
                <div class="marker-dot"></div>
            </div>`

            const markerIcon = L.divIcon({
                className: 'custom-marker-icon',
                html: markerHtml,
                iconAnchor: [16, 37], // icon center point
                popupAnchor: [0, -30], // popup placement relative to the icon
            })

            return markerIcon
        }
    }

    return (
        <>
            <MapContainer
                style={{ height: '100%' }}
                center={[60.1699, 24.9384]}
                zoom={13}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerClusterGroup chunkedLoading>
                    {powerPlantData.map((powerPlant, index) => {
                        return (
                            <Marker
                                key={index}
                                position={[
                                    powerPlant.latitude,
                                    powerPlant.longitude,
                                ]}
                                icon={getPowerPlantIcon(
                                    powerPlant.primary_fuel,
                                )}
                            >
                                <Popup>
                                    {powerPlant.name} in{' '}
                                    {powerPlant.country_long} <br /> Power plant
                                    type: {powerPlant.primary_fuel}
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
