import React from 'react'
import { Marker, Popup, MarkerProps } from 'react-leaflet'
import { Marker as LeafletMarker } from 'leaflet'

// Define the additional fields you want to add
interface AdditionalMarkerProps {
    customField1: string
    customField2: number
}

// Combine the existing MarkerProps with the AdditionalMarkerProps
interface ExtendedMarkerProps extends MarkerProps, AdditionalMarkerProps {}

// Create a new component that extends the existing Marker component
const ExtendedMarker: React.ForwardRefExoticComponent<
    ExtendedMarkerProps & React.RefAttributes<LeafletMarker<any>>
> = React.forwardRef((props, ref) => {
    // Destructure the additional fields from props
    const { customField1, customField2, ...markerProps } = props

    return (
        <Marker {...markerProps} ref={ref}>
            {/* Your existing Marker content */}
            {props.children}
        </Marker>
    )
})

export default ExtendedMarker
