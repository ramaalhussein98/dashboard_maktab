import React from "react";
import { useTranslation } from "react-i18next";

const TransctionsDetails = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const Data = [
    {
      id: 1,
      label: t("dashboard.transactions.Numberremittance"),
      value: "#12345nf",
    },
    {
      id: 2,
      label: t("dashboard.transactions.dateofstarting"),
      value: "15 نوفمبر 2022",
    },
    {
      id: 3,
      label: t("dashboard.transactions.createddate"),
      value: "15 نوفمبر 2022",
    },
    {
      id: 4,
      label: t("dashboard.transactions.transferway"),
      value: "stc pay  ",
    },
    {
      id: 5,
      label: t("dashboard.transactions.Mobiletohim"),
      value: " 054000000",
    },
    {
      id: 6,
      label: t("dashboard.transactions.Numberofrequests"),
      value: " طلب واحد",
    },
  ];
  return (
    <>
      {Data.map((data, index) => (
        <div key={index} className="d_flex_spaceBetween">
          <span className="font_gray">{data.label}</span>
          <span className="font_bold">{data.value}</span>
        </div>
      ))}
    </>
  );
};

export default TransctionsDetails;
