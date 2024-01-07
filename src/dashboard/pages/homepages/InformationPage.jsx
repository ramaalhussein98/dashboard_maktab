import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  moneyIcon,
  performanceIcon,
  transactionIcon,
  pointsIcon,
  starIcon,
  reservationsIcon,
  reportsIcon,
  peopleIcon,
  infoIcon,
} from "../../../assets/dashboard";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Chart } from "react-google-charts";
import { ArrowLeft, ArrowLeftOutlined } from "@mui/icons-material";
import { ArrowLeftIcon } from "@mui/x-date-pickers";
import CounterNumbers from "./CounterNumbers";

const Header = ({ title, icon, subTitle }) => {
  return (
    <div className="flex gap-6 ">
      <div id="icon">
        <img src={icon} alt="" />
      </div>
      <div id="content" className="self-end">
        <h2 className="font-bold text-2xl">{title}</h2>
        <span className="text-[#b5b5b5] font-semibold text-sm">{subTitle}</span>
      </div>
    </div>
  );
};

export const CustomSelect = ({ classNames }) => {
  const [isSelectClicked, setIsSelectClicked] = useState(false);
  const { i18n } = useTranslation();

  const componentRef = useRef(null);

  const handleClickOutside = (event) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setIsSelectClicked(false);
    }
  };

  useEffect(() => {
    // Attach the event listener when the component mounts
    document.body.addEventListener("click", handleClickOutside);

    // Remove the event listener when the component unmounts
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`relative w-full `}
      ref={componentRef}
      onClick={() => setIsSelectClicked((prev) => !prev)}
    >
      <select
        className={`outline-none  ${classNames} focus:border-primary w-full appearance-none`}
      >
        <option value="">option 1</option>
        <option value="">option 2</option>
        <option value="">option 3</option>
      </select>
      <div
        className={`absolute top-[50%] translate-y-[-50%] ${
          i18n.language === "ar" ? "left-1" : "right-1"
        }  ${isSelectClicked ? "rotate-[0]" : "rotate-[180deg]"}`}
      >
        <KeyboardArrowUpIcon />
      </div>
    </div>
  );
};

const cleanPercentage = (percentage) => {
  const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0; // we can set non-numbers to 0 here
  const isTooHigh = percentage > 100;
  return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
};

const Circle = ({ colour, percentage }) => {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - percentage) * circ) / 100; // where stroke will start, e.g. from 15% to 100%.
  return (
    <circle
      r={r}
      cx={50}
      cy={50}
      fill="transparent"
      stroke={strokePct !== circ ? colour : ""} // remove colour as 0% sets full circumference
      strokeWidth={"9px"}
      strokeDasharray={circ}
      strokeDashoffset={percentage ? strokePct : 0}
    ></circle>
  );
};

const Pie = ({ percentage, colour }) => {
  const pct = cleanPercentage(percentage);
  return (
    <svg width={100} height={100}>
      <g transform={`rotate(-90 ${"50 50"})`}>
        <Circle colour="#efe3df" />
        <Circle colour={colour} percentage={pct} />
      </g>
    </svg>
  );
};

export const data = [
  ["Year", "Sales", "Expenses", "Profit"],
  ["2014", 1000, 400, 200],
  ["2015", 1170, 460, 250],
  ["2016", 660, 1120, 300],
  ["2017", 1030, 540, 350],
];

const InformationPage = () => {
  const { t } = useTranslation();

  const percentage = 50;

  return (
    <>
 

      <div className="flex flex-col gap-4 w-full my-4">
        <div className="flex flex-row flex-wrap gap-4 items-stretch ">
          {/*! sales section */}
          <div className="flex-[5] sm:flex-[100%]  bg-white shadow-custom border-custom   rounded-2xl p-6">
            <CounterNumbers />
          
          </div>

          {/*! performance section */}
          {/* <div className="flex-[4] sm:flex-[100%]  bg-white shadow-md rounded-2xl p-6">
            <Header
              title={t("dashboard.homepage.titles.title2")}
              icon={performanceIcon}
            />
            <main className="flex flex-col gap-3 my-6">
              <div className="flex justify-between p-3 hover:bg-primaryBackgroundOpacity rounded-md cursor-pointer">
                <span className="font-bold">تقرير أداء 2023-09</span>
                <ArrowLeftIcon />
              </div>
            </main>
          </div> */}
        </div>

        <div className="flex flex-row flex-wrap gap-4 items-stretch">
          {/*! transactions section */}
          <div className="flex-[4] sm:flex-[100%]  bg-white shadow-md rounded-2xl p-6">
            <Header
              title={t("dashboard.homepage.titles.title3")}
              icon={transactionIcon}
            />
            <main className="flex flex-col gap-3 my-6">
              <div className="flex justify-between p-3 hover:bg-primaryBackgroundOpacity rounded-md cursor-pointer">
                <span className="font-medium">tr-123123</span>
                <span className="font-medium">15 نوفمبر</span>
                {/* <span className="font-medium">
                  <span className="p-2 bg-red-100 text-red-500 rounded-md font-bold">
                    -1500
                  </span>{" "}
                  ر.س
                </span> */}
              </div>
            </main>
          </div>

          {/*! points section */}
          <div className="flex-[5] sm:flex-[100%]  bg-white shadow-md rounded-2xl p-6">
            <Header
              title={t("dashboard.homepage.titles.title4")}
              subTitle={"تتحدث يوميا"}
              icon={pointsIcon}
            />
            <main className="my-3">
              <header className="flex gap-4 items-center">
                <div className="flex items-center justify-center flex-col w-[100px] h-[100px] relative">
                  <Pie percentage={percentage} colour="#c80000" />
                  <div className="absolute top-[50%] left-[50%] text-primary translate-x-[-50%] translate-y-[-50%] flex flex-col items-center">
                    <span className="text-4xl font-bold">{percentage}</span>
                    <span className="mt-[-10px]">نقطة</span>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <h3 className="font-semibold">شقة</h3>
                  <p className="font-medium text-gray-400">
                    سيتم إضافة النقاط تلقائياً خلال 24 ساعة من تاريخ عرض العقار
                  </p>
                </div>
              </header>

              <div className="flex flex-row flex-wrap gap-7 my-4">
                <div className="flex-1 gap-2 min-w-[120px] h-auto flex flex-col items-start shadow-custom rounded-xl p-2">
                  <span>0 /50</span>
                  <span>progress bar</span>
                  <span className="flex flex-row justify-between items-center w-full">
                    التقييمات{" "}
                    <span className="cursor-pointer">
                      <img src={infoIcon} alt="" />
                    </span>
                  </span>
                </div>
                <div className="flex-1 gap-2 min-w-[120px] h-auto flex flex-col items-start shadow-custom rounded-xl p-2">
                  <span>0/50</span>
                  <span>progress bar</span>
                  <span className="flex flex-row justify-between items-center w-full">
                    الشكاوى{" "}
                    <span className="cursor-pointer">
                      <img src={infoIcon} alt="" />
                    </span>
                  </span>
                </div>
              </div>
            </main>
          </div>
        </div>

        <div className="flex flex-row flex-wrap gap-4 items-stretch">
          {/*! reviews section */}
          <div className="flex-1 sm:flex-[100%]  bg-white shadow-md rounded-2xl p-6">
            <Header
              title={t("dashboard.homepage.titles.title5")}
              icon={starIcon}
            />
            <main className="flex flex-col gap-3 my-6">
              <div className="flex gap-4 p-3 hover:bg-primaryBackgroundOpacity rounded-md cursor-pointer">
                <span className="font-medium">nahla asdasd</span>
                <span className="font-medium text-[#888]">مشروع رائع</span>
              </div>
            </main>
          </div>

          {/*! bookings section */}
          <div className="flex-1 sm:flex-[100%]  bg-white shadow-md rounded-2xl p-6">
            <Header
              title={t("dashboard.homepage.titles.title6")}
              icon={reservationsIcon}
            />
            <main className="flex flex-col gap-3 my-6">
              <div className="flex justify-between items-center p-3 hover:bg-primaryBackgroundOpacity rounded-md cursor-pointer">
                <span className="font-medium">#123123</span>
                <span className="font-bold">عبد الكريم وانلي</span>
                <span className="font-medium">نوفمبر 12</span>
                <span className="p-2 bg-red-100 text-red-500 rounded-md font-bold">
                  ملغي
                </span>
                <span className="font-medium ">1500 ر.س</span>
              </div>
            </main>
          </div>
        </div>

        <div className="flex flex-row flex-wrap gap-4 items-stretch">
          {/*! reports section */}
          <div className="flex-1 sm:flex-[100%]  bg-white shadow-md rounded-2xl p-6">
            <Header
              title={t("dashboard.homepage.titles.title7")}
              icon={reportsIcon}
            />
          </div>

          {/*! guests section */}
          {/* <div className="flex-1 sm:flex-[100%]  bg-white shadow-md rounded-2xl p-6">
            <Header
              title={t("dashboard.homepage.titles.title8")}
              icon={peopleIcon}
            />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default InformationPage;
