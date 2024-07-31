import React from "react";

const ApiGetNew = async (methodname, args) => {
  try {
    const data = require("../assets/data.json");
    const apiUrl = data.apiRoute;
    const url = `${apiUrl}methodname=${methodname}&args=${args}`;

    console.log(url);

    const response = await fetch(url);
    const text = await response.text();
    return JSON.parse(text); 
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export default ApiGetNew;
