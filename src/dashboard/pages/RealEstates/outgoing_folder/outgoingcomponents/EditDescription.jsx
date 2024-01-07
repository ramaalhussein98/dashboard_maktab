import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const EditDescription = ({
  description,
  id,
  editDescriptionMutation,
  onCancel,
}) => {
  const [_description, setDescription] = useState(description);
  const { t } = useTranslation();

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("storing...");
    try {
      const res = await editDescriptionMutation.mutateAsync({
        description: _description,
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
      <Typography
        sx={{ fontWeight: "600", fontSize: "1.2rem", marginBottom: "1rem" }}
      >
        {t("dashboard.incoming_orders.card5.title")}
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={9}
        placeholder=" اكتب هنا"
        required
        value={_description}
        onChange={handleDescriptionChange}
        InputProps={{
          sx: {
            borderRadius: "1rem",
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: "1rem ",
          marginInline: "auto",
          flexWrap: "wrap",
          marginTop: "2rem",
        }}
      >
        <Button
          onClick={handleSubmit}
          type="submit"
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
    </Box>
  );
};

export default EditDescription;
