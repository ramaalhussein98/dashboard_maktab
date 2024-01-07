// Import necessary components and styles
import { Box, Divider, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

const CalenderSide = () => {
  const [selectedProperty, setSelectedProperty] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const handlePropertyChange = (event) => {
    setSelectedProperty(event.target.value);
  };
  const handleUnitChange = (event) => {
    setSelectedUnit(event.target.value);
  };

  return (
    <div className="flex flex-col w-[300px] gap-5 max-h-[calc(100vh-80px)] overflow-y-auto py-4">
      <Box sx={{ width: "80%", marginTop: "1rem", margin: "auto" }}>
        <p style={{ fontWeight: "700", marginBottom: "1rem" }}>حدد العقار</p>
        <Select
          value={selectedProperty}
          onChange={handlePropertyChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            width: "100%",
            "& .MuiSelect-icon": {
              color: "black",
              display: "block !important",
            },
          }}
        >
          <MenuItem value="" disabled>
            اختر العقار
          </MenuItem>
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
        </Select>
      </Box>
      <Divider
        sx={{ marginY: "1rem", height: "1px", backgroundColor: "#eee" }}
      />
      <Box sx={{ width: "80%", marginTop: "1rem", margin: "auto" }}>
        <p style={{ fontWeight: "700", marginBottom: "1rem" }}>حدد الوحدة</p>
        <Select
          value={selectedUnit}
          onChange={handleUnitChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            width: "100%",
            "& .MuiSelect-icon": {
              color: "black",
              display: "block !important",
            },
          }}
        >
          <MenuItem value="" disabled>
            اختر الوحدة
          </MenuItem>
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
        </Select>
      </Box>
    </div>
  );
};

export default CalenderSide;
