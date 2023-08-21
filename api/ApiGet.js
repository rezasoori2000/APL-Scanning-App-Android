import React from "react";

const ApiGet = async (methodname, args) => {
  try {
    var apiUrl = "";
    const data = require("../assets/data.json");
    apiUrl = data.apiRoute;

    var url = apiUrl + `methodname=${methodname}&args=${args}`;
    console.log(url);

    var response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export default ApiGet;
