import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

const getToken = async () => {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    throw new Error("Token not found");
  }

  return token;
};

const getNoAuth = async (url: string) => {
  return await api.get(url);
};
const postNoAuth = async (url: string, data: object) => {
  const req = await api.post(url, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return req.data;
};

const get = async (url: string) => {
  const token = await getToken();

  const req = await api.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return req.data;
};

const post = async (url: string, data: object) => {
  const token = await getToken();

  const req =  await api.post(url, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return req.data;
};

const put = async (url: string, data: object) => {
  const token = await getToken();

  const req =  await api.put(url, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return req.data
};

const del = async (url: string) => {
  const token = await getToken();

  const req = await api.delete(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return req.data;
};

export { get, post, put, del, getNoAuth, postNoAuth };
