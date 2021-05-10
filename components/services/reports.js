import { API_URL } from "./route";
import AsyncStorage from "@react-native-community/async-storage";

const token = AsyncStorage.getItem("userToken");

export const newReport = async (report, user, coordenates, cityName) => {
  return fetch(API_URL + "report/city/" + String(cityName), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await token),
    },
    body: JSON.stringify({
      title: report.title,
      description: report.description,
      state: "Nuevo",
      privacy: report.privacy,
      user: user,
      coordenates: coordenates,
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

export const getReports = async () => {
  return fetch(API_URL + "report/byPublicPrivacyAndVisibleState", {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + (await token),
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    });
};

export const updateReportState = async (report, newState) => {
  return fetch(baseUrl + "report", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify({
      id: report.id,
      title: report.title,
      description: report.description,
      state: newState,
      privacy: report.privacy,
      user: report.user,
      coords: report.coordenates,
      municipality: report.municipality,
    }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      return responseJson;
    });
};
