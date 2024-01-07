import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import "../../../assets/dashboard/css/prices.css";
import "./requests.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Requests = () => {
  const type = 0;
  //   here i will get the value from if مستاجر او مالة
  const handleCancelRequest = () => {
    Swal.fire({
      title: "تم  إلغاء الطلب",

      icon: "success",
    });
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom style={{ fontWeight: "700" }}>
        الطلبات
      </Typography>
      <p style={{ fontWeight: "600" }}>يتم عرض 1 من الطلبات المتاحة</p>
      <Paper className="paper_style">
        <Box className="d_flex_space_between">
          <Box>
            <p className="font_gray font_bold">رقم الطلب</p>
            <span className="font_bold">#deRed68799</span>
          </Box>
          <Box>
            <p className="font_gray font_bold"> معلومات الوحدة</p>
            <span>السعودية , الرياض</span>
            <span>يومي</span>
            <p className="font_gray font_bold" style={{ marginTop: "15px" }}>
              المبلغ المدفوع
            </p>
            <div className="boxPriceRequests">10000 ريال</div>
          </Box>
          <Box>
            <p className="font_gray font_bold">
              {" "}
              {type === 0 ? "معلومات المستأجر" : "معلومات المالك"}
            </p>
            {/* <p> معلومات المالك</p> */}
            <p>علي علي</p>
            <p>05680000000</p>
            <p>الرياض , شارع الزهور</p>
          </Box>
          <Box>
            {type === 0 ? (
              <>
                <p className="font_gray font_bold"> الإجرائيات</p>
                <div className="creteContractBox">
                  <Link to="/dashboard/acc/create_contract">إنشاء عقد</Link>
                </div>
                <div className="cancelrequestBox" onClick={handleCancelRequest}>
                  إلغاء طلب
                </div>
              </>
            ) : (
              <div>
                <p className="font_gray font_bold"> حالة الطلب</p>
                <p>قيد المعالجة</p>
              </div>
            )}
          </Box>
        </Box>
        <Box>
          <p className="font_gray font_bold">رسالة</p>
          <p>طلب تأجير</p>
        </Box>
      </Paper>
    </div>
  );
};

export default Requests;
