import { useEffect, useRef, useState } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  styled,
  Fade,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import Star from "../common_components/Star";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import OrderCard from "../common_components/OrderCard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Map } from "../../../../assets/dashboard/images";
import HourglassDisabledIcon from "@mui/icons-material/HourglassDisabled";

import {
  EditInformation,
  EditLocation,
  EditMap,
  EditDescription,
} from "./outgoingcomponents";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useQueryHook } from "../../../../hooks/useQueryHook";
import myAxios from "../../../../api/myAxios";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const CircleIconButton = styled(IconButton)({
  borderRadius: "50%",
  backgroundColor: "#d4d4d4",
  color: "white",
  padding: "0px",
});
const CustomAccordion = styled(Accordion)({
  padding: "18px",
  borderRadius: "12px",
  boxShadow: "none",
  "&:not(:last-child)": {
    marginBottom: "24px",
  },

  "&::before": {
    display: "none",
  },
});
const CustomAccordionSummary = styled(AccordionSummary)({
  borderRadius: "12px",
});
const CustomAccordionDetails = styled(AccordionDetails)({
  borderRadius: "12px",
  padding: { xs: "0rem", md: "2rem" },
});

const getData = async () => {
  const res = await myAxios.get("api/v1/user/offices/me");
  return res?.data?.data;
};
const editTitle = async ({ _title, id }) => {
  const res = await myAxios.post(`api/v1/user/offices/update_title/${id}`, {
    title: _title,
  });
  return res;
};
const editInterface = async ({ interface_id, id }) => {
  const res = await myAxios.post(`api/v1/user/offices/update_interface/${id}`, {
    interface_id,
  });
  return res;
};
const editDescription = async ({ description, id }) => {
  const res = await myAxios.post(
    `api/v1/user/offices/update_description/${id}`,
    {
      description,
    }
  );
  return res;
};

const editMapLocation = async ({ location, id }) => {
  const res = await myAxios.post(`api/v1/user/offices/update_location/${id}`, {
    lat: location.lat,
    lng: location.lng,
    zoom: location.zoom,
    address: location.address,
    city: location.city,
    neighborhood: location.neighborhood,
    street: location.street,
  });
  return res;
};

const changeSpecial = async ({ id }) => {
  const res = await myAxios.post(`api/v1/user/offices/make_special/${id}`);
  return res;
};

const deleteOffice = async ({ id }) => {
  const res = await myAxios.delete(`api/v1/user/offices/delete/${id}`);
  return res;
};

const OutGoingOrders = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const {
    data: offices,
    isLoading,
    isError,
  } = useQueryHook(["myOffices"], () => getData());

  const editTitleMutation = useMutationHook(editTitle, ["myOffices"]);
  const editInterfaceMutation = useMutationHook(editInterface, ["myOffices"]);
  const editDescriptionMutation = useMutationHook(editDescription, [
    "myOffices",
  ]);
  const editMapLocationMutation = useMutationHook(editMapLocation, [
    "myOffices",
  ]);
  const changeSpecialMutution = useMutationHook(changeSpecial, ["myOffices"]);
  const deleteMutation = useMutationHook(deleteOffice, ["myOffices"]);

  //start displaying edit components
  const [edditInfo, setEditInfo] = useState(false);
  const [descriptionEdit, setDescriptionEdit] = useState(false);
  const [edditLoc, setEditLoc] = useState(false);
  const [MapEdit, setMapEdit] = useState(false);
  const handleEditInformation = () => {
    setEditInfo(true);
  };
  const handleEditLocation = () => {
    setEditLoc(true);
  };
  const onCancel = () => {
    setEditInfo(!edditInfo);
  };
  const handleCloseEditLocation = () => {
    setEditLoc(!edditLoc);
  };
  const handleCloseEditMap = () => {
    setMapEdit(!MapEdit);
  };
  const handleMapEdit = () => {
    setMapEdit(true);
  };
  //end displaying edit components

  const [userDateReached, setUserDateReached] = useState();

  const handleChangeSpecial = async (id) => {
    const toastId = toast.loading("processing...");
    try {
      const res = await changeSpecialMutution.mutateAsync({
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

  const handleDelete = (id) => {
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
        onRemove(id); // Call the onRemove function to delete the box
      }
    });
  };
  const onRemove = async (id) => {
    const toastId = toast.loading("processing...");
    try {
      const res = await deleteMutation.mutateAsync({
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
  if (isLoading) return "loading...";

  return (
    <Box>
      <>
        <Box className="outGoingclass">
          {offices?.map((office) => (
            <CustomAccordion
              key={office.id}
              TransitionProps={{ unmountOnExit: true }}
              // expanded={expanded === `panel${office.id}`}
              // onChange={handleChange(`panel${office.id}`, office)}
            >
              <Box sx={{ paddingInline: "20px" }}>
                <CustomAccordionSummary
                  expandIcon={
                    <CircleIconButton size="small">
                      <ExpandMoreIcon sx={{ fontSize: "2rem" }} />
                    </CircleIconButton>
                  }
                  // aria-controls={`panel${office.id}-content`}
                  // id={`panel${office.id}-header`}
                >
                  <Box className="custom-flex-container">
                    <div className="custom-flex-container2">
                      <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>
                        {office.title}
                      </Typography>
                      {office?.status === 0 ? (
                        <Typography
                          sx={{
                            color: "rgb(244, 67, 54)",
                            fontWeight: "600",
                            margin: "0px 16px",
                          }}
                        >
                          غير معروض
                        </Typography>
                      ) : (
                        <Typography
                          sx={{
                            color: "var(--green-color)",
                            fontWeight: "600",
                            margin: "0px 16px",
                          }}
                        >
                          معروض
                        </Typography>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        marginTop: "4px",
                      }}
                    >
                      <Box onClick={() => handleChangeSpecial(office.id)}>
                        <div
                          style={{
                            alignItems: "center",
                            display: "flex",
                            cursor: "pointer",
                          }}
                        >
                          {Number(office?.is_special) === 1 ? (
                            <StarIcon
                              sx={{ color: "gold", fontSize: "2rem" }}
                            />
                          ) : (
                            <StarBorderIcon className="staricon" />
                          )}
                        </div>
                      </Box>
                      <Box onClick={() => handleDelete(office.id)}>
                        <DeleteForeverIcon className="deleteicon" />
                      </Box>
                    </div>
                  </Box>
                </CustomAccordionSummary>
              </Box>
              <CustomAccordionDetails>
                <Box className="custom-grid-container1">
                  <Box>
                    <OrderCard>
                      <Box className="custom-flex-container-space">
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "1.2rem" }}
                        >
                          {t("dashboard.incoming_orders.card1.label1")}
                        </Typography>

                        <Typography
                          className="eitBtn"
                          onClick={handleEditInformation}
                        >
                          {!edditInfo &&
                            t("dashboard.outgoing_requests.edit_btn")}
                        </Typography>
                      </Box>
                      {edditInfo && (
                        <Fade in={edditInfo}>
                          <Box>
                            <EditInformation
                              title={office.title}
                              editTitleMutation={editTitleMutation}
                              id={office.id}
                              onCancel={onCancel}
                            />
                          </Box>
                        </Fade>
                      )}
                      {!edditInfo && (
                        <Fade in={!edditInfo}>
                          <Box>
                            <Box className="custom-flex-container-space">
                              <Typography>
                                {t("dashboard.incoming_orders.card1.label1")}
                              </Typography>
                              <Typography>{office.title} </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "1rem",
                              }}
                            >
                              <Typography>
                                {t("dashboard.incoming_orders.card1.label2")}
                              </Typography>
                              <Typography>
                                {lang === "ar"
                                  ? office.type_aqar.ar_name
                                  : office.type_aqar.en_name}
                              </Typography>
                            </Box>
                          </Box>
                        </Fade>
                      )}
                      <Box
                        className="custom-flex-container-space"
                        sx={{
                          marginTop: "1rem",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "600",
                            fontSize: "1.2rem",
                            marginTop: "1rem",
                          }}
                        >
                          {t("dashboard.incoming_orders.card2.title")}
                        </Typography>

                        <Typography
                          className="eitBtn"
                          onClick={handleEditLocation}
                        >
                          {!edditLoc &&
                            t("dashboard.outgoing_requests.edit_btn")}
                        </Typography>
                      </Box>
                      {edditLoc && (
                        <Fade in={edditLoc}>
                          <Box>
                            <EditLocation
                              interfaceId={office.interface_aqar.id}
                              id={office.id}
                              editInterfaceMutation={editInterfaceMutation}
                              onCancel={handleCloseEditLocation}
                            />
                          </Box>
                        </Fade>
                      )}
                      {!edditLoc && (
                        <Fade in={!edditLoc}>
                          <Box>
                            <Box className="custom-flex-container-space">
                              <Typography>
                                {t("dashboard.incoming_orders.card2.label1")}
                              </Typography>
                              <Typography>{office.location.city}</Typography>
                            </Box>
                            <Box className="custom-flex-container-space">
                              <Typography>
                                {" "}
                                {t("dashboard.incoming_orders.card2.label2")}
                              </Typography>
                              <Typography>
                                {office?.location.neighborhood}
                              </Typography>
                            </Box>
                            <Box className="custom-flex-container-space">
                              <Typography>
                                {lang === "ar" ? "الشارع" : "road"}
                              </Typography>
                              <Typography>{office?.location.street}</Typography>
                            </Box>
                            <Box className="custom-flex-container-space">
                              <Typography>
                                {" "}
                                {t(
                                  "dashboard.incoming_orders.card2.label3"
                                )}{" "}
                              </Typography>
                              <Typography>
                                {lang === "ar"
                                  ? office?.interface_aqar?.ar_name
                                  : office?.interface_aqar?.en_name}
                              </Typography>
                            </Box>
                          </Box>
                        </Fade>
                      )}
                    </OrderCard>
                    <OrderCard>
                      {descriptionEdit && (
                        <Fade in={descriptionEdit}>
                          <Box>
                            <EditDescription
                              description={office.description}
                              id={office.id}
                              editDescriptionMutation={editDescriptionMutation}
                              onCancel={() => {
                                setDescriptionEdit(false);
                              }}
                            />
                          </Box>
                        </Fade>
                      )}
                      {!descriptionEdit && (
                        <Fade in={!descriptionEdit}>
                          <Box>
                            <Box className="custom-flex-container-space">
                              <Typography
                                sx={{ fontWeight: "600", fontSize: "1.2rem" }}
                              >
                                {t("dashboard.incoming_orders.card5.title")}
                              </Typography>

                              <Typography
                                className="eitBtn"
                                onClick={() => {
                                  setDescriptionEdit(true);
                                }}
                              >
                                {!descriptionEdit &&
                                  t("dashboard.outgoing_requests.edit_btn")}
                              </Typography>
                            </Box>
                            <Typography>{office?.description}</Typography>
                          </Box>
                        </Fade>
                      )}
                    </OrderCard>
                  </Box>
                  <Box>
                    <OrderCard>
                      <Box className="custom-flex-container-space">
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "1.2rem" }}
                        >
                          {t("dashboard.incoming_orders.card3.title")}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography>
                          {" "}
                          {t("dashboard.incoming_orders.card3.label1")}
                        </Typography>
                        {office?.status === 0 ? (
                          <Typography
                            sx={{
                              color: "rgb(244, 67, 54)",
                              fontWeight: "600",
                              marginBottom: "1rem",
                            }}
                          >
                            غير معروض
                          </Typography>
                        ) : (
                          <Typography className="eitBtn">معروض</Typography>
                        )}
                      </Box>
                    </OrderCard>
                    <OrderCard>
                      <Box className="custom-flex-container-space">
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "1.2rem" }}
                        >
                          {t("dashboard.incoming_orders.card4.title")}
                        </Typography>

                        <Typography className="eitBtn" onClick={handleMapEdit}>
                          {!MapEdit &&
                            t("dashboard.outgoing_requests.edit_btn")}
                        </Typography>
                      </Box>
                      {MapEdit && (
                        <Fade in={MapEdit}>
                          <Box>
                            <EditMap
                              location={office.location}
                              onCancel={handleCloseEditMap}
                              editMapLocationMutation={editMapLocationMutation}
                              id={office.id}
                            />
                          </Box>
                        </Fade>
                      )}
                      {!MapEdit && (
                        <Fade in={!MapEdit}>
                          <Box sx={{ display: "flex" }}>
                            <Typography
                              sx={{
                                color: "rgb(132, 132, 132)",
                                width: "35%",
                              }}
                            >
                              {office?.location.city +
                                ", " +
                                office?.location.neighborhood +
                                ", " +
                                office?.location.street}
                            </Typography>
                            <Box className="map-image-container">
                              <img
                                src={Map}
                                alt="My "
                                className="custom-image"
                              />
                            </Box>
                          </Box>
                        </Fade>
                      )}
                    </OrderCard>
                    <OrderCard className={"edit"}>
                      <Link
                        to={"/editOffice"}
                        state={{ office }}
                        style={{
                          textDecoration: "none",
                          color: "white",
                          backgroundColor: "var(--green-color)",
                          padding: "6px 12px",
                          borderRadius: "12px",
                        }}
                      >
                        {lang === "ar"
                          ? "تعديل كافة المعلومات"
                          : "edit all information"}
                      </Link>
                    </OrderCard>
                  </Box>
                </Box>
                <OrderCard>
                  <Box className="custom-flex-container-space">
                    <Typography sx={{ fontWeight: "600", fontSize: "1.2rem" }}>
                      {lang === "ar" ? "وحدات هذا المكتب" : "all units"}{" "}
                      <span>{office?.units?.length}</span>
                    </Typography>
                  </Box>
                </OrderCard>
              </CustomAccordionDetails>
            </CustomAccordion>
          ))}
        </Box>
      </>
    </Box>
  );
};

export default OutGoingOrders;

{
  /* <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <>
    {(() => {
      return (
        <Box className="custom-flex-column">
          <p>{lang === "ar" ? "يمكنك التحديث بعد" : "you can update after"}</p>
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              flexDirection: lang === "ar" && "row-reverse",
            }}
          >
            <span className="custom-badge">
              {/* {currentTime.formattedHours} */
}
//             </span>
//             <span className="custom-badge">
//               {/* {currentTime.formattedMinutes} */}
//             </span>
//             <span className="custom-badge">
//               {/* {currentTime.formattedSeconds} */}
//             </span>
//           </Box>
//           {userDateReached === true ? (
//             <Box onClick={() => {}} className="custom-update-button">
//               <Typography>تحديث</Typography>
//               <RefreshIcon
//                 sx={{
//                   cursor: "pointer",
//                   fontSize: "2rem",
//                 }}
//               />
//             </Box>
//           ) : (
//             <Box onClick={() => {}} className="custom-disabled-button">
//               <Typography>تحديث</Typography>
//               <RefreshIcon
//                 sx={{
//                   cursor: "pointer",
//                   fontSize: "2rem",
//                 }}
//               />
//             </Box>
//           )}
//         </Box>
//       );
//     })()}
//   </>
// </Box>; */}
