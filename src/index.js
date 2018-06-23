import React from "react";
import ReactDOM from "react-dom";
import Notes from "./Notes";
import "./css/reset.css";
import "./css/style.css";

const wrap = document.querySelector(".notes-wrap");

ReactDOM.render (
    <Notes />,
    wrap
);