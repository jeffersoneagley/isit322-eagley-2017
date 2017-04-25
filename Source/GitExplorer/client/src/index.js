import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./css/index.css";
import Header from "./components/Header/Header";

ReactDOM.render(
    <div>
        <Header/>
        <App />
    </div>,
    document.getElementById('root')
);
