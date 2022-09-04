import Map, {
    GeolocateControl,
    Marker,
    NavigationControl,
} from "react-map-gl";
import React, { useMemo, useRef, useState } from 'react'
import "mapbox-gl/dist/mapbox-gl.css";
import { useQuery } from 'react-query';
import MarkerPopup from "./MarkerPopup";



const initialViewState = {
    latitude: 50.7751,
    longitude: 12.4193,
    zoom: 3,
    bearing: 0,
    pitch: 0,
};


const MapComponent = () => {

    const [popupInfo, setPopupInfo] = useState(null)
    const { isLoading, error, data } = useQuery(['cafes'], () =>
        fetch('/api/cafes').then(res =>
            res.json()
        )
    )

    const geoRef = useRef();
    const mapContainer = useRef(null);

    const markers = useMemo(() =>
        data?.map((cafe) => {
            return (
                <Marker
                    key={cafe.googlePlaceID}
                    latitude={cafe.latitude}
                    longitude={cafe.longitude}
                    onClick={e => {
                        e.originalEvent.stopPropagation();
                        setPopupInfo(cafe);
                        mapContainer.current?.flyTo({
                            center: [cafe.longitude, cafe.latitude],
                            zoom: 5
                        })
                    }}
                >
                    <div className="flex flex-col items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                    </div>
                </Marker>
            )
        }), [data])

    return (
        <>
            <Map
                ref={mapContainer}
                style={{ width: "100vw", height: "100vh" }}
                initialViewState={initialViewState}
                mapStyle="mapbox://styles/mapbox/streets-v8"
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}

            >
                <GeolocateControl
                    // ref={geoRef}
                    position="top-left"
                    trackUserLocation={true}
                    fitBoundsOptions={{ maxZoom: 12 }}
                />
                <NavigationControl position="top-left" />
                {markers}
                {popupInfo && (
                    // <Popup
                    //     anchor="top"
                    //     focusAfterOpen={false}
                    //     longitude={Number(popupInfo.longitude)}
                    //     latitude={Number(popupInfo.latitude)}
                    //     onClose={() => setPopupInfo(null)}
                    // >
                    //     <p className="font-bold text-sm">{popupInfo.name}</p>
                    //     <p>{popupInfo.reviews.reduce((prev, current) => prev + current.rating, 0)}/5 -{' '}
                    //         <span className="text-[10px]">{popupInfo.reviews.length} {popupInfo.reviews.length > 1 ? 'reviews' : 'review'}</span></p>
                    //     <button className="text-blue-500 underline text-[10px] hover:cursor-pointer">More details</button>
                    // </Popup>
                    <MarkerPopup popupInfo={popupInfo} setPopupInfo={setPopupInfo} />
                )}
            </Map>
        </>
    )
}

export default MapComponent