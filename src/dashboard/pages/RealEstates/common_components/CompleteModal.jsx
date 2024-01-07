import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ChooseUnitModal from "./ChooseUnitModal";

const CompleteModal = ({ open, onClose, title, subtitle, yes, to }) => {
  const { t, i18n } = useTranslation();
  const [openSecondModal, setOpenSecondModal] = useState(false);
  const linkContent = to ? (
    <RouterLink to={to}>{yes}</RouterLink>
  ) : (
    <span
      onClick={() => {
        setOpenSecondModal(true);
        onClose();
      }}
      style={{ cursor: "pointer" }}
    >
      {yes}
    </span>
  );
  const closeSecondModal = () => {
    setOpenSecondModal(false);
  };
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box className="custom-box">
          <Typography>{title}</Typography>
          <Typography className="complete_p">{subtitle}</Typography>
          <Typography>{t("dashboard.Offices.sure")}</Typography>
          <Box className="BoxReal">
            <Button className="custom-button-yes">{linkContent}</Button>
            <Button className="custom-button-cancel">{t("cancel")}</Button>
          </Box>
        </Box>
      </Modal>

      <ChooseUnitModal open={openSecondModal} onClose={closeSecondModal} />
    </>
  );
};

export default CompleteModal;
