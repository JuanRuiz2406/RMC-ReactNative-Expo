import { API_URL } from "./route";
import AsyncStorage from "@react-native-community/async-storage";

const token = AsyncStorage.getItem("userToken");
const userEmail = AsyncStorage.getItem("userEmail");

export const newPhotography = async (uploadUrl, rep) => {
  return fetch(API_URL + "photography", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await token),
    },
    body: JSON.stringify({
      category: "Reporte",
      imagePath: uploadUrl,
      reports: rep,
    }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getReportPhotos = async (reportId) => {
  return fetch(API_URL + "photography/byReport/" + String(reportId), {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await token),
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson)
      return responseJson;
    });
};