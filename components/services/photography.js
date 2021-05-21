import { API_URL } from "./route";
import AsyncStorage from "@react-native-community/async-storage";

const token = AsyncStorage.getItem("userToken");
const userEmail = AsyncStorage.getItem("userEmail");

export const newPhotography = async (photography) => {
    return fetch(API_URL + "photography", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await token),
        },
        body: JSON.stringify({
            category: photography.category,
            id: 0,
            imagePath: photography.imagePath,
            reports: photography.reports,
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
}