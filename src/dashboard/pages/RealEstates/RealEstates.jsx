import { useState } from "react";
import "../../../assets/dashboard/css/real_estate.css";
import { Button, Paper, Box } from "@mui/material";
import { Plus } from "../../../assets/dashboard/icons";
import OutGoingOrders from "./outgoing_folder/OutGoingOrders";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CompleteModal from "./common_components/CompleteModal";

const RealEstates = () => {
  const [showAddoffice, setAddShowOffice] = useState(false);
  const [openModalAddUnit, setOpenModalAddUnit] = useState(false);

  const [openModalAddOffice, setOpenModalAddOfice] = useState(false);
  const { t } = useTranslation();
  const handleAddOfficeModal = () => {
    setOpenModalAddOfice(true);
  };
  const handleAddUnitModal = () => {
    setOpenModalAddUnit(true);
  };
  const handleClose = () => {
    setOpenModalAddOfice(false);
    setOpenModalAddUnit(false);
  };
  return (
    <>
      <Box className="offices">
        <p className="offices_tilte">{t("dashboard.Offices.offices")}</p>
        <Button
          className="add_office_btn"
          onClick={() => {
            setAddShowOffice(!showAddoffice);
          }}
        >
          <img src={Plus} alt="add" className="img1" />
          <span>{t("dashboard.Offices.Addanoffice")}</span>
        </Button>
      </Box>
      {showAddoffice && (
        <Paper className="office_option_list">
          <ul className="ul1">
            <li className="li1" onClick={handleAddOfficeModal}>
              {" "}
              <Link
              // to="/addoffice"
              >
                {t("dashboard.Offices.Newproperty")}
              </Link>
            </li>

            <li className="li1" onClick={handleAddUnitModal}>
              {t("dashboard.Offices.unitbelong")}
            </li>
            <li className="li1">{t("dashboard.Offices.complete")}</li>
          </ul>
        </Paper>
      )}
      <CompleteModal
        open={openModalAddOffice}
        onClose={handleClose}
        title={t("dashboard.Offices.incomplete")}
        subtitle={t("dashboard.Offices.complete")}
        yes={t("dashboard.Offices.yesadd")}
        to="/addoffice"
      />
      <CompleteModal
        open={openModalAddUnit}
        onClose={handleClose}
        title={t("dashboard.Units.incomplete")}
        subtitle={t("dashboard.Units.complete")}
        yes={t("dashboard.Units.yesadd")}
      />
      {/* my ads  */}
      <OutGoingOrders />
    </>
  );
};

export default RealEstates;
