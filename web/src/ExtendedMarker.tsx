import L from 'leaflet'

interface CustomMarkerOptions extends L.MarkerOptions {
    primaryFuel: string
    mw: number
}

class CustomMarker extends L.Marker {
    private _primaryFuel: string
    private _mw: number

    constructor(latlng: L.LatLngExpression, options: CustomMarkerOptions) {
        super(latlng, options)
        this._primaryFuel = options.primaryFuel
        this._mw = options.mw
    }

    get primaryFuel(): string {
        return this._primaryFuel
    }

    get mw(): number {
        return this._mw
    }
}

export default CustomMarker
