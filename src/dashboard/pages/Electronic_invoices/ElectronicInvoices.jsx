import React from "react";
import "../../../assets/dashboard/css/electronic_invoices.css";

import {
  LocalPrintshop as LocalPrintshopIcon,
  ArrowBack as ArrowBackIcon,
  Email as EmailIcon,
} from "@mui/icons-material";

import { QR } from "../../../assets/dashboard/images";
import { RedLogo } from "../../../assets/dashboard/logos";
const ElectronicInvoices = () => {
  const billDetails = [
    { label: "فاتورة رقم", value: "04555" },
    { label: "التاريخ", value: "01-01-2023" },
    { label: "رقم الجوال", value: "05555555555" },
  ];

  const customerDetails = [
    { label: "اسم العميل", value: "نجوم التقنية للمعلومات" },
    { label: "نوع الفاتورة", value: "فاتورة ضريبة تفصيلية" },
    { label: "العنوان", value: "الرياض" },
    { label: "الرقم الضريبي", value: "023444" },
    { label: "حالة الفاتورة", value: "مفعلة" },
    { label: "تفاصيل الفاتورة", value: "lorem lorem lorem" },
  ];
  const tableRowData = {
    id: 1,
    البيان: "منتج 1",
    الكمية: 5,
    الوحدة: "قطعة",
    السعر: 20.0,
    المبلغ: 100.0,
    الإجمالي: 120.0,
    قيمة_مضافة: 20.0,
    السعر_شامل_القيمة_المضافة: 140.0,
  };

  return (
    <>
      <div className="d-flex-justify-space ">
        <p className="details_title">تفاصيل الفاتورة</p>
        <div className="d-flex">
          <button className="btnBack">
            <ArrowBackIcon
              className="svgIcon"
              sx={{ transform: "rotate(180deg)" }}
            />
            رجوع
          </button>
          <button className="btnPrint">
            <LocalPrintshopIcon className="svgIcon" />
            طباعة
          </button>
          <button className="btnSent">
            <EmailIcon className="svgIcon" />
            إرسال
          </button>
        </div>
      </div>
      <div className="cantEditBills">
        بعد اعتمادها لا يمكنك حذف أو تعديل الفاتورة يمكنك الغاء الفاتورة كأشعار
      </div>
      <div className="d-flex-justify-space ">
        <div>
          <p>مكتب</p>
          <p>العنوان: حي الربوة</p>
          <p>الرقم الضريبي: #123444555</p>
          <p> رقم السجل التجاري:#123444555</p>
          <p>البريد الالكتروني: info@mail.com</p>
          <p>رقم الجوال : 096666666</p>
        </div>
        <div className="logoContainer">
          <img src={QR} className="img1" alt="qr_code" />
          <p>فاتورة الاشتراكات</p>
          <p className="green-weight">تم الدفع</p>
        </div>
        <div className="logoContainer">
          <img src={RedLogo} className="img1" alt="logo" />
        </div>
      </div>
      <div className="Bills-details-container">
        {billDetails.map((detail, index) => (
          <span key={index}>{`${detail.label}: ${detail.value}`}</span>
        ))}
      </div>
      <div className="d-flex flex-wrap mb-4">
        {customerDetails.map((detail, index) => (
          <>
            <div key={index} className="backgroundBox Gray1">
              {detail.label}
            </div>
            <div key={index} className="backgroundBox GrayLight">
              {detail.value}
            </div>
          </>
        ))}
      </div>
      {/* table of total prices */}
      <table className="invoice-table">
        <thead>
          <tr className="table-row text-center">
            <th style={{ width: "5%" }}>id</th>
            <th style={{ width: "15%" }}>البيان</th>
            <th style={{ width: "10%" }}>الكمية</th>
            <th style={{ width: "10%" }}>الوحدة</th>
            <th style={{ width: "10%" }}>السعر</th>
            <th style={{ width: "10%" }}>المبلغ</th>
            <th style={{ width: "10%" }}>الإجمالي</th>
            <th style={{ width: "10%" }}>قيمة مضافة</th>
            <th style={{ width: "10%" }}>السعر شامل القيمة المضافة</th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr key={tableRowData.id} className="text-center">
            <td>{tableRowData.id}</td>
            <td>{tableRowData.البيان}</td>
            <td>{tableRowData.الكمية}</td>
            <td>{tableRowData.الوحدة}</td>
            <td>{tableRowData.السعر}</td>
            <td>{tableRowData.المبلغ}</td>
            <td>{tableRowData.الإجمالي}</td>
            <td>{tableRowData.قيمة_مضافة}</td>
            <td>{tableRowData.السعر_شامل_القيمة_المضافة}</td>
          </tr>
        </tbody>
      </table>
      <div className="d-flex-justify-space payment_container">
        <div className="d_column">
          <span>الإجمالي</span>
        </div>
        <div className="d_column">
          <span>أجمالي الخصم</span>
          <span>0.00 ر.س</span>
        </div>
        <div className="d_column">
          <span> الأجمالي الخاضع للضريبة</span>
          <span>200 ر.س</span>
        </div>
        <div className="d_column">
          <span> إجمالي القيمة المضافة</span>
          <span>200 ر.س</span>
        </div>
        <div className="d_column">
          <span>   الاجمالي الشامل لضريبة قيمة مضافة</span>
          <span>621 ر.س</span>
        </div>
      </div>
    </>
  );
};

export default ElectronicInvoices;
