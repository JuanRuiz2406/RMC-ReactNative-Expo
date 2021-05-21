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
    return fetch(API_URL + "auth/login", {
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
            provider: provider
        }),
    })
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.log(error);
        });
}

export const loginUserThird = async (user, provider, pass) => {
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
            direction: "direccion",
            idCard: user.idCard,
            role: "user"
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
            provider: "normal",
            role: "user"
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

export const newUserThird = async (user, provider) => {
    return fetch(API_URL + "auth/loginWithGoogle", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            direction: "direccion",
            email: user.email,
            idCard: "123456789",
            lastName: user.familyName,
            name: user.givenName,
            password: "123456789",
            provider: provider,
            role: "user"
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

export const newUserFB = async (user, provider) => {
    return fetch(API_URL + "auth/loginWithGoogle", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            direction: "direccion",
            email: user.email,
            idCard: "123456789",
            lastName: "Apellidos",
            name: user.name,
            password: "123456789",
            provider: provider,
            role: "user"
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
