import React from "react";
import "../scss/main.scss";
import { IoSearchOutline } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
import { IoSunnySharp } from "react-icons/io5";

const Header = () => {
  return (
    <div className="header">
      <div className="account">
        <p>Giriş Yap</p>
        <p>Kayıt Ol</p>
      </div>
      <div className="logo-container">
        <p>COIN MARKET</p>
      </div>

      <div className="bg-changer">
        <IoSunnyOutline size={30} color="white" style={{ cursor: "pointer" }} />
      </div>
    </div>
  );
};

export default Header;
