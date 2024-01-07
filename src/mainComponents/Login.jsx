import { Checkbox, FormControlLabel, Paper } from "@mui/material";
import React, { useState } from "react";
import { BlackRed } from "../assets/dashboard/logos";
import "../assets/dashboard/css/login_home.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [checked, setChecked] = useState(false);
  const handleCheckToggle = () => {
    setChecked(!checked);
  };
  return (
    <Paper className="LoginContainer" sx={{ boxShadow: { xs: "0", md: "3" } }}>
      <img src={BlackRed} className="logoImg" />
      <p className="font_gray">تسجيل الدخول إالى لوحة التحكم</p>
      <input
        className="inputLogin"
        type="email"
        placeholder="البريد الإلكتروني"
      />
      <input
        className="inputLogin"
        type="password"
        placeholder="كلمة المرور "
      />
      <FormControlLabel
        className="checkboxstyle"
        control={
          <Checkbox
            style={{
              color: "black",
              width: "40px",
            }}
            checked={checked}
            onChange={handleCheckToggle}
          />
        }
        label="حفظ بيانات تسجيل الدخول"
      />
      <Link to="/dashboard/home" className="loginButton">
        تسجيل الدخول
      </Link>
    </Paper>
  );
};

export default Login;
