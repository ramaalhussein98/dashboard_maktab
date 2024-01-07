import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MuiButton } from "../../../mainComponents/CustomStyledMuiComponents";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Swal from "sweetalert2";
import RequestsSkeleton from "../../../ui/RequestsSkeleton";

import Map from "../../../assets/dashboard/images/map.jpg";
const array = [
  {
    id: 1,
    name: "عبد الكريم وانلي",
    reserveId: "242462",
    aqarName: "    مكتب مؤثث الرياض حي الياسمين",
    date: "من السبت 12 نوفمبر الى 20 نوفمبر ",
    price: "5130",
    reserveBy: "مكتب",
  },
  {
    id: 2,
    name: "عبد الكريم وانلي",
    reserveId: "242462",
    aqarName: "    مكتب متحرك في الرياض",
    date: "من السبت 12 نوفمبر الى 20 نوفمبر ",
    price: "5130",
    reserveBy: "مكتب",
  },
  {
    id: 3,
    name: "عبد الكريم وانلي",
    reserveId: "242462",
    aqarName: "    وحدة مكتبية حاضنة ذكي",
    date: "من السبت 12 نوفمبر الى 20 نوفمبر ",
    price: "5130",
    reserveBy: "مكتب",
  },
];

const Reservations = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [selectedSort, setSelectedSort] = useState(1);
  const type = 0;
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up("md"));
  const [expanded, setExpanded] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleCancelRequest = () => {
    Swal.fire({
      title: "تم  إلغاء الطلب",
      icon: "success",
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="relative">
      {/* <header className="flex items-center justify-center p-2 gap-3 sticky top-20">
        <span className="font-bold ">الترتيب ب</span>
        <div className="flex items-stretch">
          <MuiButton
            sx={{
              backgroundColor: selectedSort === 1 ? "#000" : "#fff",
              color: selectedSort === 1 ? "white" : "black",
              minWidth: "140px",
              padding: "8px !important",
              borderRadius: "0px",
              borderTopRightRadius: i18n.language === "en" && "8px",
              borderBottomRightRadius: i18n.language === "en" && "8px",
              borderTopLeftRadius: i18n.language === "ar" && "8px",
              borderBottomLeftRadius: i18n.language === "ar" && "8px",
              "&:hover": {
                backgroundColor: "rgba(200,0,0, .05)",
                color: "red",
              },
              fontWeight: "700",
              fontSize: "16px",
            }}
            onClick={() => setSelectedSort(1)}
          >
            آخر الحجوزات
          </MuiButton>
          <MuiButton
            sx={{
              backgroundColor: selectedSort === 2 ? "#000" : "#fff",
              color: selectedSort === 2 ? "white" : "black",
              minWidth: "140px",
              padding: "8px !important",
              borderRadius: "0px",
              borderTopRightRadius: i18n.language === "ar" && "8px",
              borderBottomRightRadius: i18n.language === "ar" && "8px",
              borderTopLeftRadius: i18n.language === "en" && "8px",
              borderBottomLeftRadius: i18n.language === "en" && "8px",
              "&:hover": {
                backgroundColor: "rgba(200,0,0, .05)",
                color: "red",
              },
              fontWeight: "700",
              fontSize: "16px",
            }}
            onClick={() => setSelectedSort(2)}
          >
            الطلبات
          </MuiButton>
        </div>
      </header> */}
      {isLoading ? (
        <>
          {Array.from({ length: 3 }, (_, index) => (
            <RequestsSkeleton key={index} />
          ))}
        </>
      ) : (
        <main className=" overflow-y-auto rounded-2xl p-2 flex flex-col gap-8">
          {array.map((ele) => (
            <div
              key={ele.id}
              className="flex gap-0 bg-white rounded-2xl shadow-customTwo"
            >
              {expanded === `panel${ele.id}` ? (
                ""
              ) : (
                <div
                  className="text-vertical-rl
               text-center 
               font-semibold 
                bg-green-500
               text-white 
               rounded-tr-2xl 
               rounded-br-2xl
                p-2"
                  style={{ display: isMD ? "block" : "none" }}
                >
                  {lang === "en" ? "new" : "جديد"}
                </div>
              )}

              <Accordion
                expanded={expanded === `panel${ele.id}`}
                onChange={handleChange(`panel${ele.id}`)}
                sx={{
                  boxShadow: "none",
                  border: "none",
                  borderTop: "none",
                  flex: "1",
                  borderBottomLeftRadius: "0px !important",
                  borderBottomRightRadius: "0px !important",
                  borderRadius: "16px !important",
                  "&::before": {
                    display: "none",
                  },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <div className="flex w-[95%] justify-between items-center mx-auto">
                    <div className="flex flex-col gap-4">
                      <span className="font-semibold">
                        #{ele.reserveId} - {ele.name}
                      </span>
                      <span className="text-[#888] text-lg font-medium">
                        {ele.aqarName}
                      </span>
                      <span className="text-[#888] text-lg font-medium">
                        {ele.date}
                      </span>
                    </div>
                    <div className="flex flex-col gap-6 items-end">
                      <span
                        className="font-bold text-2xl text-green-500"
                        style={{ width: "max-content" }}
                      >
                        {ele.price} {""}
                        <span className="text-[#888]">{t("currency")}</span>
                      </span>
                      <span className="text-[#888] text-lg font-medium">
                        {ele.reserveBy}
                      </span>
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="text-center mb-6 bg-red-100 rounded-md p-2 text-red-500 font-bold ">
                    حجز 1450439 ملغي مسترجع (مكتب)
                  </div>
                  <div
                    className={`flex  gap-4 mt-5 ${
                      isMD ? "flex-row" : "flex-col !important"
                    }`}
                  >
                    <div
                      className={`flex flex-col gap-4 ${
                        isMD ? "w-1/2" : "w-full !important"
                      }`}
                    >
                      <div className="dashCard">
                        <h2 className="font-bold text-lg mb-4">
                          {" "}
                          {t("dashboard.reservation.Tenantinformation")}
                        </h2>
                        <div className="flex flex-col gap-3">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">
                              {t("dashboard.incoming_orders.card1.label1")}
                            </span>
                            <span className="text-[#888]">
                              عبد الكريم وانلي
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">
                              {" "}
                              {t("dashboard.reservation.Identityinformation")}
                            </span>
                            <span className="text-[#888]">#123456789 </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">
                              {t("dashboard.reservation.phone")}
                            </span>
                            <span className="text-[#888]">055555555 </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">
                              {t("dashboard.reservation.location")}
                            </span>
                            <span className="text-[#888]">
                              الرياض , شارع الزهور{" "}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`flex flex-col gap-4 ${
                        isMD ? "w-1/2" : "w-full !important"
                      }`}
                    >
                      <div className="dashCard">
                        <h2 className="font-bold text-lg mb-4">
                          {t("dashboard.reservation.Unitinformation")}
                        </h2>
                        <div className="flex flex-col gap-3">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">
                              {t("dashboard.reservation.Propertyname")}
                            </span>
                            <span className="text-[#888]">
                              {" "}
                              مكتب مشترك للإيجار
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">
                              {t("dashboard.reservation.Unit")}
                            </span>
                            <span className="text-[#888]">15</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">
                              {t("dashboard.reservation.location")}
                            </span>
                            <span className="text-[#888]">
                              السعودية , الرياض
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">
                              {t("dashboard.reservation.bookingdate")}
                            </span>
                            <span className="text-[#888]"> 03-10-223</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">
                              {t("dashboard.reservation.Expirydate")}
                            </span>
                            <span className="text-[#888]"> 03-10-223</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">
                              {t("dashboard.reservation.Rentalterm")}
                            </span>
                            <span className="text-[#888]"> سنة</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`flex  gap-4 mt-5 ${
                      isMD ? "flex-row" : "flex-col !important"
                    }`}
                  >
                    <div
                      className={`flex flex-col gap-4 ${
                        isMD ? "w-1/2" : "w-full !important"
                      }`}
                    >
                      <div className="dashCard">
                        <h2 className="font-bold text-lg mb-4">
                          {t("dashboard.reservation.Lessorinformation")}
                        </h2>
                        <div className="flex flex-col gap-3">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">
                              {t("dashboard.incoming_orders.card1.label1")}
                            </span>
                            <span className="text-[#888]">
                              عبد الكريم وانلي
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">
                              {t("dashboard.personal_info.label8")}
                            </span>
                            <span className="text-[#888]">#123456789 </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">
                              {" "}
                              {t("dashboard.reservation.phone")}
                            </span>
                            <span className="text-[#888]">055555555 </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">
                              {" "}
                              {t("dashboard.reservation.location")}
                            </span>
                            <span className="text-[#888]">
                              الرياض , شارع الزهور{" "}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`flex flex-col gap-4 ${
                        isMD ? "w-1/2" : "w-full !important"
                      }`}
                    >
                      <div className="dashCard">
                        <h2 className="font-bold text-lg mb-4">
                          {t("dashboard.reservation.Paymentdata")}
                        </h2>
                        <div className="flex flex-col gap-3">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">
                              {t("dashboard.reservation.paymentmethod")}
                            </span>
                            <span className="text-[#888]">بنك</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">
                              {t("dashboard.reservation.paidup")}
                            </span>
                            <div
                              className="boxPriceRequests"
                              style={{
                                margin: "0px",
                                padding: "5px 10px",
                                marginLeft: "-10px",
                              }}
                            >
                              10000 {t("Rial")}
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">
                              {t("dashboard.reservation.cashRemid")}
                            </span>
                            <span className="text-[red]">
                              10.000 {t("Rial")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4 mt-5">
                    <div
                      className={`flex flex-col gap-4 ${
                        isMD ? "w-1/2" : "w-full !important"
                      }`}
                    >
                      <div className="dashCard">
                        <h2 className="font-bold text-lg mb-4">
                          {t("dashboard.reservation.Procedural")}
                        </h2>
                        <div
                          className="flex flex-col gap-3"
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          {type === 0 ? (
                            <>
                              <div className="creteContractBox">
                                <Link to="/dashboard/acc/create_contract">
                                  {t("dashboard.reservation.CreateAcontract")}
                                </Link>
                              </div>
                              <div
                                className="cancelrequestBox"
                                onClick={handleCancelRequest}
                              >
                                {t("dashboard.reservation.CaneclRequest")}
                              </div>
                            </>
                          ) : (
                            <div>
                              <p className="font_gray font_bold"> حالة الطلب</p>
                              <p>قيد المعالجة</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`flex flex-col gap-4 ${
                        isMD ? "w-1/2" : "w-full !important"
                      }`}
                    >
                      <div className="dashCard">
                        <h2 className="font-bold text-lg mb-4">
                          {t("dashboard.reservation.Siteinspectordata")}
                        </h2>
                        <div className="flex flex-col gap-3">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">
                              {t("dashboard.incoming_orders.card1.label1")}
                            </span>
                            <span className="text-[#888]">محمد محمد</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">
                              {t("dashboard.reservation.phonenumber")}
                            </span>
                            <span className="text-[#888]"> 050000000</span>
                          </div>
                          <Link
                            // href={`https://www.google.com/maps/dir/My+Location/${adInfo.lat},${adInfo.lng}/@${adInfo.lat},${adInfo.lng},12z/data=!3m1!4b1?entry=ttu`}
                            target="_blank"
                          >
                            <img
                              src={Map}
                              alt="mapImg"
                              style={{ width: "100%", borderRadius: "2rem" }}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
        </main>
      )}
    </div>
  );
};

export default Reservations;
