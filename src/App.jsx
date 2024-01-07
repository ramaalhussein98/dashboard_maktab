import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Routes, Route, json } from "react-router-dom";
import { Helmet } from "react-helmet";
import DashLayout from "./dashboard/components/DashLayout";
import InformationPage from "./dashboard/pages/homepages/InformationPage";
import UnitSettings from "./dashboard/pages/homepages/UnitSettings";
import Reservations from "./dashboard/pages/reservations/Reservations";
import Calender from "./dashboard/pages/Calender/Calender";
import RealEstates from "./dashboard/pages/RealEstates/RealEstates";
import Addads from "./dashboard/pages/add_ads_folder/Addads";
import Prices from "./dashboard/pages/prices/Prices";
import MainPrices from "./dashboard/pages/prices/MainPrices";
import Offers from "./dashboard/pages/prices/Offers";
import DownPrice from "./dashboard/pages/prices/DownPrice";
import Bills from "./dashboard/pages/Bills/Bills";
import Contracts from "./dashboard/pages/Contracts/Contracts";
import Finance from "./dashboard/pages/Finance/Finance";
import Requests from "./dashboard/pages/Requests/Requests";
import ContractDetails from "./dashboard/pages/Contracts/ContractDetails/ContractDetails";
import CreateContract from "./website/pages/CreateContract/CreateContract";
import InstantPayment from "./dashboard/pages/Instant_payment/InstantPayment";
import MyInfo from "./dashboard/pages/my_info/MyInfo";
import FinancialTransactions from "./dashboard/pages/financial_transactions/FinancialTransactions";
import AccountStatements from "./dashboard/pages/account_statements/AccountStatements";
import PaymentReceiption from "./dashboard/pages/paymentReceiption/PaymentReceiption";
import BillingStatements from "./dashboard/pages/BillingStatements/BillingStatements";
import AddUnit from "./dashboard/pages/add_unit/AddUnit";
import ElectronicInvoices from "./dashboard/pages/Electronic_invoices/ElectronicInvoices";
import CreateTypeContract from "./dashboard/pages/create_type_contract/CreateTypeContract";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditAds from "./dashboard/pages/editAds/EditAds";
import myAxios from "./api/myAxios";
import Login from "./mainComponents/Login";

function App() {
  const { i18n } = useTranslation();
  const language = i18n.language;
  const thereisToken = localStorage.getItem("user_token");
  const settingData = JSON.parse(localStorage.getItem("settingData"));

  useEffect(() => {
    const searchData = localStorage.getItem("searchData");
    const getData = async () => {
      const res = await myAxios.get("api/v1/user/settings/search_data");
      console.log(res);
      if (res?.data?.status === true) {
        localStorage.setItem("searchData", JSON.stringify(res?.data?.data));
      }
    };
    if (!searchData) {
      getData();
    }

    const getSettingData = async () => {
      const res2 = await myAxios.get("api/v1/user/settings/general");
      console.log(res2);
      if (res2?.data?.status === true) {
        localStorage.setItem("settingData", JSON.stringify(res2?.data?.data));
      }
    };
    if (!settingData) {
      getSettingData();
    } else {
      document.title =
        language === "en"
          ? settingData.site_title_en
          : settingData.site_title_ar;
    }
  }, [language]);

  useEffect(() => {
    const searchData = localStorage.getItem("searchData");
    const getData = async () => {
      const res = await myAxios.get("api/v1/user/settings/search_data");
      console.log(res);
      if (res.data.status === true) {
        localStorage.setItem("searchData", JSON.stringify(res.data.data));
      }
    };
    if (!searchData) {
      getData();
    }
    setTimeout(() => {
      const unitsFacilities = localStorage.getItem("unitsFacilities");
      const getData2 = async () => {
        const res = await myAxios.get("api/v1/user/units/facilities");
        console.log(res);
        if (res.data.status === true) {
          localStorage.setItem(
            "unitsFacilities",
            JSON.stringify(res.data.data)
          );
        }
      };
      if (!unitsFacilities) {
        getData2();
      }
    }, 750);
    setTimeout(() => {
      const roomDetails = localStorage.getItem("roomDetails");
      const getData4 = async () => {
        const res = await myAxios.get("api/v1/user/units/room_details");
        console.log(res);
        if (res.data.status === true) {
          localStorage.setItem("roomDetails", JSON.stringify(res.data.data));
        }
      };
      if (!roomDetails) {
        getData4();
      }
    }, 1250);
    setTimeout(() => {
      const unitsFeatures = localStorage.getItem("unitsFeatures");
      const getData3 = async () => {
        const res = await myAxios.get("api/v1/user/units/features");
        console.log(res);
        if (res.data.status === true) {
          localStorage.setItem("unitsFeatures", JSON.stringify(res.data.data));
        }
      };
      if (!unitsFeatures) {
        getData3();
      }
    }, 1750);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "direction",
      language === "ar" ? "rtl" : "ltr"
    );
    document.documentElement.lang = language;

    document.documentElement.style.setProperty(
      "text-align",
      language === "ar" ? "right" : "left"
    );
  }, [language]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <Helmet>
        <meta
          name="description"
          content={
            language === "ar"
              ? settingData?.site_desc_ar
              : settingData?.site_desc_en
          }
        />
        <meta
          name="keywords"
          content={
            language === "ar"
              ? settingData?.site_keywords_ar
              : settingData?.site_keywords_en
          }
        />
      </Helmet>
      <Routes>
        <Route index element={<Login />} />

        <Route path="dashboard" element={<DashLayout />}>
          <Route path="home">
            <Route index element={<InformationPage />} />
            <Route path="unit-settings" element={<UnitSettings />} />
          </Route>
          <Route path="my_info" element={<MyInfo />} />
          <Route path="calendar" element={<Calender />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="properties" element={<RealEstates />} />
          <Route path="transactions" element={<FinancialTransactions />} />
          <Route path="billing_statements" element={<BillingStatements />} />
          <Route path="statements" element={<AccountStatements />} />
          <Route path="paymentReceiption" element={<PaymentReceiption />} />
          <Route path="electronic_invoices" element={<ElectronicInvoices />} />

          <Route path="acc">
            <Route index path="requests" element={<Requests />} />
            <Route path="contracts" element={<Contracts />} />
            <Route path="contact_details" element={<ContractDetails />} />
            <Route path="create_contract" element={<CreateContract />} />
            <Route path="finance" element={<Finance />} />
            <Route path="InstantPayment" element={<InstantPayment />} />
            <Route
              path="create_type_contract"
              element={<CreateTypeContract />}
            />
          </Route>
          <Route path="prices">
            <Route path="main" element={<MainPrices />} />
            <Route path="offers" element={<Offers />} />
            <Route path="down-prices" element={<DownPrice />} />
          </Route>
        </Route>

        <Route path="addoffice" element={<Addads />} />
        <Route path="addunit" element={<AddUnit />} />
        <Route path="editOffice" element={<EditAds />} />
      </Routes>
    </>
  );
}

export default App;
