import Head from "next/head";
import Map, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import PlaceList from "../components/PlaceList";
import { useRef, useCallback, useState, useEffect } from "react";
import db from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import Dashboard from "../components/Dashboard";
import Image from "next/image";

const initialViewState = {
  latitude: 52.7751,
  longitude: 12.4193,
  zoom: 3,
  bearing: 0,
  pitch: 0,
};

export default function Home() {
  const [data, setData] = useState([]);
  const [popupInfo, setPopupInfo] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyCafes, setNearbyCafes] = useState(null);
  const mapRef = useRef();
  const geoRef = useRef();

  const distanceKM = useCallback((lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }, []);
  // convert degrees to radians
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  useEffect(() => {
    if (userLocation && data) {
      const { latitude, longitude } = userLocation;
      const cafes = data.map(({ data, reviews, rating }) => {
        const { geometry } = data;
        const { lat, lng } = geometry.location;
        const distance = distanceKM(latitude, longitude, lat, lng);
        return { data, reviews, rating, distance };
      });
      setNearbyCafes(cafes.sort((a, b) => a.distance - b.distance));
    }
  }, [data, distanceKM, userLocation]);

  const triggerGeoLocation = useCallback(() => {
    geoRef.current.trigger();
  }, []);

  useEffect(() => {
    return onSnapshot(collection(db, "cafes"), (snapshot) => {
      setData(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  const pins = data.map(({ data }) => (
    <Marker
      key={data.place_id}
      longitude={data.geometry.location.lng}
      latitude={data.geometry.location.lat}
      onClick={(e) => {
        e.originalEvent.stopPropagation();
        setPopupInfo(data);
      }}
    ></Marker>
  ));

  const onSelectPlace = useCallback((longitude, latitude) => {
    mapRef.current?.flyTo({
      center: [longitude, latitude],
      zoom: 10,
      duration: 4000,
    });
  }, []);

  return (
    <div>
      <Head>
        <title>Cafe Comprende</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="icon"
          href="https://cdn.shopify.com/s/files/1/0299/2046/0884/files/SyraCoffee_-_CoffeeThunderboltLogoBlac-Espacio_600x_1_1024x1024.png?v=1624869379"
        />
        <script
          async
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`}
        ></script>
      </Head>
      <main className="flex">
        <div className="h-[100vh] w-[30vw] overflow-scroll">
          <Dashboard
            onSelectPlace={onSelectPlace}
            triggerGeoLocation={triggerGeoLocation}
          />
          <PlaceList onSelectPlace={onSelectPlace} nearbyCafes={nearbyCafes} />
        </div>
        <>
          <Map
            ref={mapRef}
            style={{ width: "70vw", height: "100vh" }}
            initialViewState={initialViewState}
            mapStyle="mapbox://styles/mapbox/streets-v8"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
          >
            <GeolocateControl
              ref={geoRef}
              position="top-left"
              fitBoundsOptions={{ maxZoom: 12 }}
              onGeolocate={(e) => setUserLocation(e.coords)}
            />
            <NavigationControl position="top-left" />
            {pins}
            {popupInfo && (
              <Popup
                longitude={popupInfo.geometry.location.lng}
                focusAfterOpen={false}
                className="p-0"
                latitude={popupInfo.geometry.location.lat}
                anchor="top"
                onClose={() => setPopupInfo(null)}
              >
                <div className="flex">
                  <Image
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=150&maxheight=150&photo_reference=${popupInfo.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
                    alt={"image"}
                    height={100}
                    width={100}
                  />
                  <p>{popupInfo.name}</p>
                </div>
              </Popup>
            )}
          </Map>
        </>
      </main>
    </div>
  );
}
