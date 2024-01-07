import { useEffect, useState } from "react";
import SideNavLink from "./SideNavLink";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const HomepageSide = () => {
  const [typeSide, setTypeSide] = useState();
  const location = useLocation().pathname;
  const { t } = useTranslation();
  const user_type_bussines = true
    // localStorage.getItem("user_type") === "bussines" ? true : false;
  useEffect(() => {
    if (location.split("/").includes("home")) {
      setTypeSide(0);
    } else if (location.split("/").includes("prices")) {
      setTypeSide(1);
    } else if (
      location.includes("requests") ||
      location.includes("contracts") ||
      location.includes("finance")
    ) {
      setTypeSide(2);
    } else if (
      location.includes("statements") ||
      location.includes("transactions") ||
      location.includes("paymentReceiption")
    ) {
      setTypeSide(3);
    } else {
      setTypeSide(0);
    }
  }, [location]);

  const navArray = [
    {
      id: 1,
      title: t("dashboard.sideContent.link1"),
      url: "home",
    },
    {
      id: 2,
      title: t("dashboard.sideContent.link2"),
      url: "reservations",
    },
    // {
    //   id: 3,
    //   title: t("dashboard.sideContent.link3"),
    //   url: "weekly-reports",
    // },

    {
      id: 5,
      title: t("dashboard.sideContent.link5"),
      url: "prices/main",
    },
    {
      id: 6,
      title: t("dashboard.sideContent.link6"),
      url: "transactions",
    },
    {
      id: 7,
      title: t("dashboard.sideContent.link7"),
      url: "acc/contracts",
    },

    {
      id: 8,
      title: t("dashboard.sideContent.link8"),
      url: "home/unit-settings",
    },
    {
      id: 9,
      title: t("dashboard.sideContent.link9"),
      url: "my_info",
    },
  ];
  const filteredNavArray = navArray.filter((item) => {
    // Check if user_type_bussines is false and the link should be hidden
    return (
      user_type_bussines ||
      ![
        "properties",
        "transactions",
        "prices/main",
        "home/unit-settings",
      ].includes(item.url)
    );
  });
  const ArrayPricesSide = [
    {
      id: 1,
      title: t("dashboard.pricesNav.link1"),
      url: "prices/main",
    },
    {
      id: 2,
      title: t("dashboard.pricesNav.link2"),
      url: "prices/offers",
    },
    {
      id: 3,
      title: t("dashboard.pricesNav.link3"),
      url: "prices/down-prices",
    },
  ];
  const ArrayBillsSide = [
    {
      id: 1,
      title: t("dashboard.BillsNav.link1"),
      url: "/dashboard/reservations",
    },
    {
      id: 2,
      title: t("dashboard.BillsNav.link2"),
      url: "acc/contracts",
    },
    {
      id: 3,
      title: t("dashboard.BillsNav.link3"),
      url: "acc/finance",
    },
  ];
  const ArrayTransactionsSide = [
    {
      id: 1,
      title: t("dashboard.transactions.Moneytransfers"),
      url: "/dashboard/transactions",
    },
    {
      id: 2,
      title: t("dashboard.Invoices.Invoices"),
      url: "/dashboard/billing_statements",
    },
    {
      id: 3,
      title: t("dashboard.Accountstatements.Accountstatements"),
      url: "/dashboard/statements",
    },
    {
      id: 4,
      title: t("dashboard.howReaviceMoney.reciveMoney"),
      url: "/dashboard/paymentReceiption",
    },
  ];

  return (
    <nav className="flex flex-col w-[300px]">
      {
        typeSide === 0
          ? filteredNavArray.map((ele, i) => (
              <SideNavLink key={i} title={ele.title} to={ele.url} />
            ))
          : typeSide === 1
          ? ArrayPricesSide.map((ele, i) => (
              <SideNavLink key={i} title={ele.title} to={ele.url} />
            ))
          : typeSide === 2
          ? ArrayBillsSide.map((ele, i) => (
              <SideNavLink key={i} title={ele.title} to={ele.url} />
            ))
          : typeSide === 3
          ? ArrayTransactionsSide.map((ele, i) => (
              <SideNavLink key={i} title={ele.title} to={ele.url} />
            ))
          : null // Optional fallback for handling other cases
      }
    </nav>
  );
};

export default HomepageSide;
