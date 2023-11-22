import React, { useEffect, useRef } from 'react'
import MapHandler from './MapHandler'

const MapComponent: React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null)
    const mapHandlerRef = useRef<MapHandler | null>(null)

    useEffect(() => {
        if (mapContainerRef.current && !mapHandlerRef.current) {
            const mapHandler = new MapHandler(mapContainerRef.current)
            mapHandler.initMap()
            mapHandlerRef.current = mapHandler
        }

        return () => {
            // Cleanup when the component is unmounted
            if (mapHandlerRef.current) {
                mapHandlerRef.current.destroyMap()
                mapHandlerRef.current = null
            }
        }
    }, [])

    return (
        <div
            ref={mapContainerRef}
            style={{ width: '100%', height: '100vh', position: 'absolute' }}
        />
    )
}

export default MapComponent
