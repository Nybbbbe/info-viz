import L from 'leaflet'
import 'leaflet.markercluster'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import power_plant_database from './power_plant_database.json'
import {
    biomass,
    cogeneration,
    gas,
    hydro,
    nuclear,
    oil,
    solar,
    wind,
    coal,
} from './assets/icons'

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
    coal: coal(),
}

class MapHandler {
    private container: HTMLDivElement
    private map: L.Map | null = null

    constructor(container: HTMLDivElement) {
        this.container = container
    }

    public initMap(): void {
        this.map = L.map(this.container).setView([60.1699, 24.9384], 12) // Set the initial view to your desired coordinates and zoom level

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
        }).addTo(this.map as L.Map)
        this.createMarkerCluster()
    }

    public destroyMap(): void {
        if (this.map) {
            this.map.remove()
            this.map = null
        }
    }

    private createMarkerCluster = (): void => {
        const markers = L.markerClusterGroup()

        powerPlantData.forEach((powerPlant) => {
            const { latitude, longitude, name, primary_fuel } = powerPlant

            if (latitude !== null && longitude !== null) {
                const customIcon = this.getDivIcon(primary_fuel)

                const marker = L.marker([latitude, longitude], {
                    icon: customIcon,
                }).bindPopup(`<b>${name}</b><br>Primary Fuel: ${primary_fuel}`)
                markers.addLayer(marker)
            }
        })

        this.map?.addLayer(markers)

        markers.
    }

    private getDivIcon = (type: string): L.DivIcon => {
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
}

export default MapHandler
