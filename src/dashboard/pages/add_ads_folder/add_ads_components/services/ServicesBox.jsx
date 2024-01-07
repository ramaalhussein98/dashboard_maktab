import { Box, Switch, TextField } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MinimizeIcon from "@mui/icons-material/Minimize";
import { useTranslation } from "react-i18next";
import { alpha, styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import Swal from "sweetalert2";
import "./service.css";
const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "var(--green-color)",
    "&:hover": {
      backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "var(--green-color)",
  },
}));

const ServicesBox = ({ onRemove, onToggle, data, index, dispatch }) => {
  const [id, setId] = useState(data?.id);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const handleChangeEvent = (event) => {
    const { name, value } = event.target;
    dispatch({
      type: "services",
      sub_type: "changeService",
      name,
      value,
      index,
    });
  };

  const handleChange = () => {
    const toggleNewVal = !data.status;
    dispatch({
      type: "services",
      sub_type: "changeService",
      name: "status",
      value: toggleNewVal,
      index,
    });
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this box.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      customClass: {
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked "Yes, delete it!"
        onRemove(); // Call the onRemove function to delete the box
      }
    });
  };

  return (
    <Box>
      <Box sx={{ position: "relative", marginBottom: "1rem" }}>
        <input
          style={{
            width: "100%",
            backgroundColor: " #eee",
            padding: "10px 7px",
          }}
          readOnly
          value={data?.ar_name}
        />
        <CloseIcon
          sx={{
            position: "absolute",
            left: "0px",
            top: "8px",
            color: "red",
            cursor: "pointer",
          }}
          onClick={handleDelete}
        />
        <MinimizeIcon
          sx={{
            position: "absolute",
            left: "24px",
            top: "0px",
            color: "blue",
            cursor: "pointer",
          }}
          onClick={onToggle}
        />
      </Box>
      {data.service_toggle && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "end",
            border: "1px solid #eee",
            padding: "10px",
          }}
        >
          <div
            style={{ width: "50%", display: "flex", flexDirection: "column" }}
          >
            <label
              htmlFor="my-text-field"
              style={{ fontWeight: "500", marginBottom: "4px" }}
            >
              {t("dashboard.incoming_orders.card1.label1")}
            </label>
            <TextField
              id="my-text-field"
              type="text"
              name="ar_name"
              onChange={handleChangeEvent}
              value={data?.ar_name}
              size="small"
              sx={{
                width: "96%",
                borderRadius: "12px",
                textAlign: lang === "ar" ? "right" : "left",
                "&[readonly]": {
                  backgroundColor: "lightgray",
                  color: "darkgray",
                },
              }}
            />
          </div>
          <div
            style={{ width: "50%", display: "flex", flexDirection: "column" }}
          >
            <label
              htmlFor="identify"
              style={{ fontWeight: "500", marginBottom: "4px" }}
            >
              {lang === "ar" ? "الاسم في الانكليزية" : "name in arabic"}
            </label>
            <TextField
              id="identify"
              type="text"
              name="en_name"
              value={data?.en_name}
              onChange={handleChangeEvent}
              size="small"
              sx={{
                width: "96%",
                borderRadius: "12px",
                textAlign: lang === "ar" ? "right" : "left",
                "&[readonly]": {
                  backgroundColor: "lightgray",
                  color: "darkgray",
                },
              }}
            />
          </div>
          <div
            style={{ width: "50%", display: "flex", flexDirection: "column" }}
          >
            <label
              htmlFor="price"
              style={{ fontWeight: "500", marginBottom: "4px" }}
            >
              {t("dashboard.order_details.label1")}
            </label>
            <TextField
              id="price"
              type="text"
              name="price"
              value={data?.price}
              onChange={handleChangeEvent}
              size="small"
              sx={{
                width: "96%",
                borderRadius: "12px",
                textAlign: lang === "ar" ? "right" : "left",
                "&[readonly]": {
                  backgroundColor: "lightgray",
                  color: "darkgray",
                },
              }}
            />
          </div>
          <GreenSwitch
            className="Switch1"
            checked={data?.status}
            onChange={handleChange}
            sx={{
              "& .MuiSwitch-thumb": { backgroundColor: "#14b183 !important" },
            }}
            inputProps={{ "aria-label": "toggle switch" }}
          />
        </Box>
      )}
    </Box>
  );
};

export default ServicesBox;
