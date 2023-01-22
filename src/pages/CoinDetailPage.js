import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../scss/main.scss";
import axios from "axios";
const CoinDetailPage = () => {
  const location = useLocation();
  const coinName = location.pathname.split("/")[1];
  const [coin, setCoin] = useState();

  useEffect(() => {
    const getCoin = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/bitcoin"
        );
        setCoin(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCoin();
    console.log(coin);
  }, []);

  return <div>coin</div>;
};

export default CoinDetailPage;
