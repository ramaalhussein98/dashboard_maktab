import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
// import useDataFetcher from "../../../../api/useDataFetcher ";

const EditInformation = ({ title, onCancel, editTitleMutation, id }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [_title, setTitle] = useState(title);

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("storing...");
    try {
      const res = await editTitleMutation.mutateAsync({ _title, id });
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
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography>{t("dashboard.incoming_orders.card1.label1")}</Typography>
          <TextField
            type="text"
            name="title"
            value={_title}
            onChange={handleTitleChange}
            sx={{
              maxWidth: "340px",
              width: { xs: "80%", md: "90%" },
              marginInline: "1rem auto",

              borderRadius: "12px !important",
              boxShadow: "1",
              "& .css-1iy5sao-MuiInputBase-root-MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
            InputProps={{
              sx: {
                "& input": {
                  borderRadius: "12px !important",
                  padding: "13px 0.8rem",
                },
              },
            }}
          ></TextField>
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

export default EditInformation;
