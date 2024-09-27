import axios, { AxiosResponse } from "axios";
import { searchApiType } from "./types";

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const searchApi = async (
  data: searchApiType,
  responseCallback: (response: AxiosResponse) => void
) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/user?search=${data.name}`,
      data,
      config
    );
    responseCallback(response);
  } catch (error: any) {
    console.error("Search Api Error", error.message);
    responseCallback(error.response);
  }
};
