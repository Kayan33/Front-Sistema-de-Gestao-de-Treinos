import React from 'react';
import { AiOutlineLoading } from "react-icons/ai";
import "./Loading.css"



const Loading= ({ loading }) => {
  return loading ? (
    <div className="loading-container">
      <div className="loading"></div>
      <AiOutlineLoading />
      <p>Carregando...</p>
    </div>
  ) : null;
};

export default Loading;
