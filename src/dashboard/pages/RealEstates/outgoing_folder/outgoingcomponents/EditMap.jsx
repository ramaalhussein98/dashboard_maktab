import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { useTranslation } from "react-i18next";
import mapMarkerIcon from "../../../../../assets/dashboard/icons/mapMarker2.svg";
import { toast } from "react-toastify";
const googleMapsApiKey = "AIzaSyCUSxdxRLpvkegxpk9-82sUjCylgekfGUk";

const containerStyle = {
  width: "100%",
  height: "400px",
};
const EditMap = ({ location, onCancel, editMapLocationMutation, id }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleMapsApiKey,
  });
  const { t } = useTranslation();
  const [userMarkers, setUserMarkers] = useState([]);
  const [city, setCity] = useState(location.city);
  const [neighborhood, setNeighborhood] = useState(location.neighborhood);
  const [street, setStreet] = useState(location.street);
  const [error, setError] = useState(false);
  const [centeredMap, setCenteredMap] = useState();
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleMapLoad = () => {
    setMapLoaded(true);
  };
  useEffect(() => {
    if (mapLoaded) {
      if (location.lat && location.lng) {
        const clickedPosition = {
          lat: Number(location?.lat),
          lng: Number(location?.lng),
          zoom: 10,
        };
        const newMarker = {
          position: clickedPosition,
          id: new Date().getTime(),
        };
        setCenteredMap({ lat: clickedPosition.lat, lng: clickedPosition.lng });
        setUserMarkers([newMarker]);
      }
    }
  }, [mapLoaded]);

  const handleMapClick = (event) => {
    const clickedPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      zoom: 10,
    };
    const newMarker = {
      position: clickedPosition,
      id: new Date().getTime(),
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
                  setError(false);
                } else {
                  setError(true);
                }
              }
              if (component.types.includes("locality")) {
                setCity(component.long_name);
              }
              if (component.types.includes("sublocality")) {
                setNeighborhood(component.long_name);
              }
              if (component.types.includes("route")) {
                setStreet(component.long_name);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("storing...");
    try {
      const res = await editMapLocationMutation.mutateAsync({
        location: {
          lat: centeredMap.lat,
          lng: centeredMap.lng,
          zoom: centeredMap.zoom,
          city,
          neighborhood,
          street,
        },
        id,
      });
      toast.update(toastId, {
        type: "success",
        render: res.data.message,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
    } catch (error) {
      toast.update(toastId, {
        type: "error",
        // render: error.response.data.message,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
    }
  };

  return (
    <Box>
      <form>
        <Box
          sx={{
            width: "100%",
            aspectRatio: "1",
            borderRadius: "12px",
            overflow: "hidden",
            position: "relative",
            marginInline: "auto",
          }}
        >
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={centeredMap}
              zoom={10}
              onClick={(event) => handleMapClick(event)}
              onLoad={handleMapLoad}
            >
              {userMarkers.map((marker, index) => (
                <Marker
                  icon={{
                    // path: google.maps.SymbolPath.CIRCLE,
                    url: mapMarkerIcon,
                  }}
                  key={index}
                  position={marker.position}
                />
              ))}
            </GoogleMap>
          )}
        </Box>
        <Box
          sx={{
            borderWidth: "0px 0px thin",
            borderStyle: "solid",
            borderColor: "rgba(0, 0, 0, 0.12)",
            margin: "2rem 4rem",
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: "1rem ",
            marginInline: "auto",
            flexWrap: "wrap",
          }}
        >
          <Button
            type="submit"
            disabled={error}
            onClick={handleSubmit}
            sx={{
              fontWeight: "600",
              borderRadius: "8px",
              minWidth: "186px",
              padding: "0.75rem 2.5rem",
              height: "50px",
              backgroundColor: "var(--main-color)",
              color: "white",
              "&:hover": {
                backgroundColor: "#0b7b5a",
                color: "white",
              },
            }}
          >
            {t("dashboard.outgoing_requests.submit_btn")}
          </Button>
          <Button
            sx={{
              fontWeight: "600",
              borderRadius: "8px",

              border: "1px solid var(--main-color)",
              minWidth: "186px",
              padding: "0.75rem 2.5rem",
              height: "50px",
              backgroundColor: "white",
              color: "var(--main-color)",
              "&:hover": {
                backgroundColor: "#e5f9f4",
              },
            }}
            onClick={onCancel}
          >
            {t("dashboard.outgoing_requests.cancel_btn")}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditMap;
