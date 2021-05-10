import { API_URL } from "./route";
import AsyncStorage from "@react-native-community/async-storage";

const token = AsyncStorage.getItem("userToken");
const userEmail = AsyncStorage.getItem("userEmail");

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

export const getUserReports = async () => {
  return fetch(API_URL + "report/byUserEmail/" + (await userEmail), {
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

export const getReportDetails = async (reportId) => {
  return fetch(API_URL + "detailReport/byReport/" + String(reportId), {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await token),
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    });
};


export const deleteReport = async (reportId) => {
  return fetch(API_URL + "report/" + String(reportId), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await token),
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    });
};
