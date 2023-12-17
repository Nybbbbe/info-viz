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
import CustomMarker from './ExtendedMarker'

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

    private createCustomClusterIcon(childMarkers: L.Marker[]): L.DivIcon {
        const customMarkers = childMarkers as CustomMarker[]

        const fuelCounts: { [key: string]: number } = {}
        customMarkers.forEach((marker) => {
            const primaryFuel = marker.primaryFuel
            const mw = marker.mw
            if (primaryFuel) {
                fuelCounts[primaryFuel] = (fuelCounts[primaryFuel] || 0) + mw
            }
        })

        // Prepare data for the pie chart
        const labels = Object.keys(fuelCounts)
        const data = labels.map((label) => fuelCounts[label])

        // Define colors for each fuel type
        const fuelColors: { [key: string]: string } = {
            Coal: '#000000',
            Gas: '#e69800',
            Hydro: '#004da8',
            Nuclear: '#38a800',
            Oil: '#894444',
            Wind: '#73b2ff',
            Biomass: '#ff00c5',
            Geothermal: '#ff0000',
            Solar: '#e6e600',
            Other: '#c500ff',

            Storage: '#ffc0cb',
            Cogeneration: '#d2b48c',
            Waste: '#ff5733',
            WaveTidal: '#00ffff',
            Petcoke: '#8b0000',
        }

        // Use Chart.js to create a pie chart with specific colors
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (ctx) {
            const colors = labels.map((label) => fuelColors[label] || '#CCCCCC')
            const total = data.reduce((acc, value) => acc + value, 0)
            let startAngle = 0
            canvas.width = 40
            canvas.height = 40

            for (let i = 0; i < data.length; i++) {
                const percentage = data[i] / total
                const endAngle = startAngle + percentage * 2 * Math.PI

                ctx.beginPath()
                ctx.moveTo(20, 20) // Center of the canvas, adjust as needed
                ctx.arc(20, 20, 20, startAngle, endAngle)
                ctx.fillStyle = colors[i]
                ctx.fill()

                startAngle = endAngle
            }

            // const inspectDiv = document.createElement('div')
            // inspectDiv.style.position = 'absolute'
            // inspectDiv.style.top = '0'
            // inspectDiv.style.left = '0'
            // inspectDiv.style.zIndex = '1000'
            // inspectDiv.style.width = '400px'
            // inspectDiv.style.height = '400px'
            // inspectDiv.style.backgroundColor = 'lightgrey'
            // inspectDiv.innerHTML = `<img src="${canvas.toDataURL()}" alt="chart-inspection" />`
            // inspectDiv.appendChild(canvas)
            // document.body.appendChild(inspectDiv)

            const dataURL = canvas.toDataURL()

            return L.divIcon({
                html: `<img src="${dataURL}" alt="cluster-icon" />`,
                className: 'custom-cluster-icon',
                iconSize: [40, 40], // Adjust the size as needed
            })
        }

        return L.divIcon({ className: 'custom-cluster-icon' })
    }

    private createMarkerCluster = (): void => {
        const markers = L.markerClusterGroup({
            iconCreateFunction: (cluster) => {
                const childMarkers = cluster.getAllChildMarkers()
                const customIcon = this.createCustomClusterIcon(childMarkers)
                return customIcon
            },
        })

        powerPlantData.forEach((powerPlant) => {
            const { latitude, longitude, name, primary_fuel, capacity_mw } =
                powerPlant

            if (latitude !== null && longitude !== null) {
                const customIcon = this.getDivIcon(primary_fuel)

                const marker = new CustomMarker([latitude, longitude], {
                    icon: customIcon,
                    primaryFuel: primary_fuel,
                    mw: capacity_mw,
                }).bindPopup(`<b>${name}</b><br>Primary Fuel: ${primary_fuel}`)
                markers.addLayer(marker)
            }
        })

        this.map?.addLayer(markers)
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
