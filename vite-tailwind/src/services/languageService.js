// src/services/languageService.js
import axios from "axios";

const BASE_URL = "http://localhost:8005/api/language-preferences";

export const getLanguagePreference = (userId) => {
  return axios.get(`${BASE_URL}/get/${userId}`);
};

export const saveLanguagePreference = ({ userId, language }) => {
  return axios.post(`${BASE_URL}`, { userId, language });
};

export const updateLanguagePreference = ({ userId, language }) => {
  return axios.put(`${BASE_URL}/update/${userId}`, { language });
};
