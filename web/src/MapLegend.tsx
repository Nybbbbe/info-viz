const MapLegend = () => {
    const legendItems = [
        { text: 'Hydro', color: '#004da8' },
        { text: 'Solar', color: '#e6e600' },
        { text: 'Gas', color: '#e69800' },
        { text: 'Other', color: '#c500ff' },
        { text: 'Oil', color: '#894444' },
        { text: 'Wind', color: '#73b2ff' },
        { text: 'Nuclear', color: '#38a800' },
        { text: 'Coal', color: '#000000' },
        { text: 'Waste', color: '#ff5733' },
        { text: 'Biomass', color: '#ff00c5' },
        { text: 'Wave Tidal', color: '#00ffff' },
        { text: 'Petcoke', color: '#8b0000' },
        { text: 'Geothermal', color: '#ff0000' },
        { text: 'Storage', color: '#ffc0cb' },
        { text: 'Cogeneration', color: '#d2b48c' },
    ]

    return (
        <div className="legend-container">
            {legendItems.map((item, index) => (
                <div key={index} className="legend-item">
                    <div
                        className="legend-circle"
                        style={{ backgroundColor: item.color }}
                    ></div>
                    <div className="legend-text">{item.text}</div>
                </div>
            ))}
        </div>
    )
}

export default MapLegend
