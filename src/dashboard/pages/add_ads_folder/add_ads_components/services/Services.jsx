import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import ServicesBox from "./ServicesBox";
import AddIcon from "@mui/icons-material/Add";

const Services = ({ state, dispatch, features }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const handlePropertyClick = (propertyId) => {
    dispatch({ type: "features", value: propertyId });
  };

  // Function to add a new service box
  const addServiceBox = () => {
    dispatch({ type: "services", sub_type: "add" });
  };

  // Function to remove a service box
  const removeServiceBox = (index) => {
    dispatch({ type: "services", sub_type: "remove", index });
  };

  // Function to toggle a service box
  const toggleServiceBox = (index) => {
    const toggleNewVal = !state?.services[index].service_toggle;
    dispatch({ type: "services", sub_type: "toggle", index, toggleNewVal });
  };

  return (
    <div>
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "600",
            marginBottom: "16px",
            marginTop: "8px",
            fontSize: { xs: "1.2rem", md: "1.5rem" },
          }}
        >
          {lang === "ar" ? "الخدمات والمميزات" : "Services And Features"}
        </Typography>
        <Box
          sx={{
            display: "grid",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
          }}
        >
          {features.map((property) => (
            <Box
              key={property.id}
              onClick={() => handlePropertyClick(property.id)}
              sx={{
                height: "100px",
                width: "100px",
                border: "1px solid gray",
                display: "flex",
                textAlign: "center",
                alignItems: "end",
                borderRadius: "12px",
                position: "relative",
                cursor: "pointer",
                padding: "10px 0px",
                marginBottom: "1rem",
                backgroundColor: state?.features.some(
                  (item) => item === property.id
                )
                  ? "var(--green-color)"
                  : "transparent",
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              <img
                src={`https://dashboard.maktab.sa/${property.icon}`}
                alt="img"
                style={{
                  position: "absolute",
                  insetBlockStart: "15px",
                  insetInlineStart: "14px",
                  width: "36px",
                }}
              />
              <Typography
                sx={{
                  width: "100%",
                  textAlign: "center",
                  color: state?.features.some((item) => item === property.id)
                    ? "white"
                    : "black",
                }}
              >
                {lang === "ar" ? property.ar_name : property.en_name}
              </Typography>
              <input type="hidden" value={property.id} />
            </Box>
          ))}
        </Box>
        <Box sx={{ marginBottom: "1rem" }}>
          <Typography sx={{ fontWeight: "500" }}>
            {lang === "ar" ? "الخدمات " : "Services  "}
          </Typography>
        </Box>
      </Box>
      <Typography>
        {lang === "ar" ? "  خدمات إضافية " : "Additional Services  "}
      </Typography>
      {state?.services.map((serviceBox, index) => (
        <ServicesBox
          key={index}
          data={serviceBox}
          onRemove={() => removeServiceBox(index)}
          onToggle={() => toggleServiceBox(index)}
          index={index}
          dispatch={dispatch}
        />
      ))}

      <Button
        onClick={addServiceBox}
        sx={{
          backgroundColor: "var(--green-color)",
          marginY: "1rem",
          "&:hover": {
            backgroundColor: "var(--green-color)",
            color: "white",
          },
        }}
      >
        <AddIcon sx={{ color: "white" }} />
      </Button>
    </div>
  );
};

export default Services;
