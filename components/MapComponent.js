import Map, {
    GeolocateControl,
    Marker,
    NavigationControl,
    Popup,
} from "react-map-gl";
import React, { useCallback, useRef } from 'react'
import "mapbox-gl/dist/mapbox-gl.css";



const initialViewState = {
    latitude: 52.7751,
    longitude: 12.4193,
    zoom: 3,
    bearing: 0,
    pitch: 0,
};


const MapComponent = () => {

    const mapRef = useRef();
    const geoRef = useRef();

    return (
        <>
            <Map
                ref={mapRef}
                style={{ width: "100vw", height: "100vh" }}
                initialViewState={initialViewState}
                mapStyle="mapbox://styles/mapbox/streets-v8"
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
            >
                <GeolocateControl
                    ref={geoRef}
                    position="top-left"
                    fitBoundsOptions={{ maxZoom: 12 }}
                // onGeolocate={(e) => setUserLocation(e.coords)}
                />
                <NavigationControl position="top-left" />
                {/* {pins} */}
            </Map></>
    )
}

export default MapComponent