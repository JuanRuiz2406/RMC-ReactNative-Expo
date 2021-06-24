import { API_URL } from "./route";
import AsyncStorage from "@react-native-community/async-storage";

const token = AsyncStorage.getItem("userToken");
const userTemp = AsyncStorage.getItem("user");

export const deleteUser = async (userEmail) => {
  return fetch(API_URL + "user/state/" + String(userEmail), {
    method: "PUT",
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
      provider: provider,
    }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.log(error);
    });
};

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
      role: "user",
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
};

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
      role: "user",
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
      role: "user",
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
      role: "user",
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

export const updateVerificationCode = async (userEmail) => {
  return fetch(API_URL + "user/verificationCode/" + String(userEmail), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
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

export const verificationCode = async (email, code, password) => {
  return fetch(
    API_URL +
      "user/verificationCode/" +
      String(email) +
      "/" +
      String(code) +
      "/" +
      String(password),
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      return responseJson;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const updateUserPassword = async (user, password) => {
  return fetch(API_URL + "user/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await token),
    },
    body: JSON.stringify({
      id: user.id,
      idCard: user.idCard,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: password,
      passdecode: password,
      role: user.role,
      direction: user.direction,
      state: user.state,
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

export const updateUserImage = async (user, image) => {
  return fetch(API_URL + "user/image/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await token),
    },
    body: JSON.stringify({
      id: user.id,
      idCard: user.idCard,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      imgURL: image.toString(),
      passdecode: user.passdecode,
      role: user.role,
      direction: user.direction,
      state: user.state,
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

export const updateUser = async (user, userId, user2) => {
  console.log(user);
  return fetch(API_URL + "user/updateProfile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await token),
    },
    body: JSON.stringify({
      id: userId,
      name: user2.name,
      lastname: user2.lastname,
      idCard: user.idCard,
      email: user.email,
      password: user.password,
      direction: user.direction,
      role: user2.role,
      state: user2.state,
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
export const getByIdUser = async (id) => {
  return fetch(API_URL + "user/" + String(id), {
    method: "GET",
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
