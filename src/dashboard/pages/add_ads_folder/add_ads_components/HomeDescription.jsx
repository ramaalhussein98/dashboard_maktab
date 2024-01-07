import React, { useState } from "react";
import { Box, Typography, TextField, Button, Tooltip } from "@mui/material";

import { useTranslation } from "react-i18next";

import OrderTitles from "../../new_order_folder/new_order_components/OrderTitles";

const HomeDescription = ({ state, dispatch }) => {
  const { t } = useTranslation();
  const handleDescriptionChange = (event) => {
    const inputValue = event.target.value;

    dispatch({ type: "description", value: inputValue });
  };

  return (
    <Box>
      <OrderTitles title={t("dashboard.property_desc.title")} />
      <Typography
        sx={{
          color: "rgb(118, 118, 118)",
          marginBottom: "8px",
        }}
      >
        {t("dashboard.property_desc.hint")}
      </Typography>
      <Typography sx={{ color: "rgb(118, 118, 118)" }}>
        {t("dashboard.property_desc.desc")}
      </Typography>
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginY: "1rem",
            alignItems: "center",
          }}
        >
          <Typography
            variant="label"
            sx={{
              fontSize: "18px",
              color: "rgb(17, 17, 17)",
              fontWeight: "bold",
            }}
          >
            {t("dashboard.property_desc.label")}
          </Typography>
          <Tooltip
            title={
              <div
                style={{
                  border: "1px solid rgb(212,205,299)",
                  borderRadius: "12px",
                  padding: "1rem",

                  backgroundColor: "white",
                  zIndex: "1",
                  fontSize: "1rem",
                  boxShadow: "none",
                  color: "inherit",
                  overflow: "hidden",
                }}
              >
                {/* Content to show when hovering */}
                <p
                  style={{
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {t("dashboard.property_desc.ex_title")}
                </p>
                <p style={{ color: "rgb(118, 118, 118)" }}>
                  {t("dashboard.property_desc.ex_desc")}
                </p>
              </div>
            }
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "transparent",
                  maxWidth: "360px",
                },
              },
            }}
          >
            <Button sx={{ color: "var(--green-color)", fontSize: "17px" }}>
              {t("dashboard.property_desc.ex_btn")}
            </Button>
          </Tooltip>
        </Box>
      </Box>
      <TextField
        fullWidth
        multiline
        rows={7}
        placeholder={t("dashboard.property_desc.placeholder")}
        required
        value={state?.description}
        onChange={handleDescriptionChange}
        InputProps={{
          sx: {
            borderRadius: "1rem",
          },
        }}
      />
    </Box>
  );
};

export default HomeDescription;
