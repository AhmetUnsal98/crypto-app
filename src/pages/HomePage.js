import React from "react";
import Header from "../components/Header";
import Table from "../components/Table";
import "../scss/main.scss";

const HomePage = () => {
  return (
    <div className="home">
      <Header />
      <Table />
    </div>
  );
};

export default HomePage;
