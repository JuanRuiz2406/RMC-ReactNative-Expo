import { API_URL } from "./route";
import AsyncStorage from "@react-native-community/async-storage";

const token = AsyncStorage.getItem("userToken");
const userTemp = AsyncStorage.getItem("user");

export const deleteUser = async (userEmail) => {
    return fetch(API_URL + "user/" + String(userEmail), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await token),
        },
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

export const loginUser = async (user, provider, pass) => {
    return fetch(API_URL + "auth/loginproviders", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: user.email,
            lastName: user.lastName,
            name: user.name,
            password: pass,
            provider: provider,
        }),
    })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            return responseJson;
        })
        .catch((error) => {
            console.log(error);
        });
}

export const newUser = async (user) => {
    return fetch(API_URL + "auth/new", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            direction: user.direction,
            email: user.email,
            idCard: user.idCard,
            lastName: user.lastName,
            name: user.name,
            password: user.password,
            role: "user",
            state: "activo"
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

export const newUserThird = async (user) => {
    return fetch(API_URL + "auth/new", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            direction: user.direction,
            email: userTemp.email,
            idCard: user.idCard,
            lastName: userTemp.lastName,
            name: userTemp.name,
            password: user.password,
            role: "user",
            state: "activo"
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
