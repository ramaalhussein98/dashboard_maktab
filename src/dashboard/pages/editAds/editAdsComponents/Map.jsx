import React, { useEffect } from "react";
import { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { toast } from "react-toastify";
import mapMarkerIcon from "../../../../assets/dashboard/icons/mapMarker2.svg";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const googleMapsApiKey = "AIzaSyCUSxdxRLpvkegxpk9-82sUjCylgekfGUk";

const Map = ({ state, dispatch }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleMapsApiKey,
  });
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  const [userMarkers, setUserMarkers] = useState([]);
  // const userLocation = JSON.parse(localStorage.getItem("userLocation"));

  const [centeredMap, setCenteredMap] = useState({
    lat: 24.786389772943902,
    lng: 46.41807925635318,
  });

  // useEffect(() => {
  //   setError(true);
  // }, []);

  useEffect(() => {
    if (mapLoaded) {
      if (state?.lat && state?.lng) {
        const clickedPosition = {
          lat: state.lat,
          lng: state.lng,
          zoom: state.zoom,
        };

        const newMarker = {
          position: clickedPosition,
          id: new Date().getTime(), // Generate a unique ID
        };

        setCenteredMap({ lat: clickedPosition.lat, lng: clickedPosition.lng });
        setUserMarkers([newMarker]);
        // setError(false);
      } else {
        const clickedPosition = {
          lat: centeredMap.lat,
          lng: centeredMap.lng,
          zoom: 10,
        };
        const newMarker = {
          position: clickedPosition,
          id: new Date().getTime(), // Generate a unique ID
        };
        setCenteredMap({ lat: clickedPosition.lat, lng: clickedPosition.lng });
        setUserMarkers([newMarker]);
        let isSaudiArabia = false;
        //getting the country
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${clickedPosition.lat},${clickedPosition.lng}&key=${googleMapsApiKey}&language=ar`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "OK" && data.results.length > 0) {
              for (const result of data.results) {
                // Extract city name and neighborhood name from address components
                for (const component of result.address_components) {
                  if (component.types.includes("country")) {
                    const countryName = component.long_name;
                    if (countryName === "السعودية") {
                      isSaudiArabia = true;
                      // setError(false);
                    } else {
                      // setError(true);
                    }
                  }
                  if (component.types.includes("locality")) {
                    dispatch({ type: "city", value: component.long_name });
                  }
                  if (component.types.includes("sublocality")) {
                    dispatch({
                      type: "neighborhood",
                      value: component.long_name,
                    });
                  }
                  if (component.types.includes("route")) {
                    dispatch({ type: "street", value: component.long_name });
                  }
                }
              }
              if (!isSaudiArabia) {
                // The location is not in Saudi Arabia
                toast.error(
                  "لايمكن الاختيار خارج حدود المملكة العربية السعودية"
                );
              }
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }
  }, [mapLoaded]);

  const handleMapClick = (event) => {
    const clickedPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      zoom: 10,
    };
    dispatch({ type: "mapClick", clickedPosition });
    const newMarker = {
      position: clickedPosition,
      id: new Date().getTime(), // Generate a unique ID
    };

    setCenteredMap({ lat: clickedPosition.lat, lng: clickedPosition.lng });

    setUserMarkers([newMarker]);
    let isSaudiArabia = false;
    // getting the country
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${clickedPosition.lat},${clickedPosition.lng}&key=${googleMapsApiKey}&language=ar`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK" && data.results.length > 0) {
          for (const result of data.results) {
            // Extract city name and neighborhood name from address components
            for (const component of result.address_components) {
              if (component.types.includes("country")) {
                const countryName = component.long_name;
                if (countryName === "السعودية") {
                  isSaudiArabia = true;
                  // setError(false);
                } else {
                  // setError(true);
                }
              }
              if (component.types.includes("locality")) {
                dispatch({ type: "city", value: component.long_name });
              }
              if (component.types.includes("sublocality")) {
                dispatch({ type: "neighborhood", value: component.long_name });
              }
              if (component.types.includes("route")) {
                dispatch({ type: "street", value: component.long_name });
              }
            }
          }
          if (!isSaudiArabia) {
            // The location is not in Saudi Arabia
            toast.error("لايمكن الاختيار خارج حدود المملكة العربية السعودية");
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    isLoaded && (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centeredMap}
        zoom={10}
        onClick={(event) => handleMapClick(event)}
        onLoad={handleMapLoad}
      >
        {userMarkers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            icon={{
              // path: google.maps.SymbolPath.CIRCLE,
              url: mapMarkerIcon,
              scale: 1,
            }}
          />
        ))}
      </GoogleMap>
    )
  );
};

export default Map;
