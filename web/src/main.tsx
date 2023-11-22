import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import MapComponent from './MapComponent.tsx'
import MapLegend from './MapLegend.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MapComponent />
        <MapLegend />
    </React.StrictMode>,
)
