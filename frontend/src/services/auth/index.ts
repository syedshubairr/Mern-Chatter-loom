import axios, {AxiosResponse} from 'axios';
import {LoginType, SignUpType} from './types';
const config = {
  headers: {'Content-Type': 'application/json'},
};

export const LoginApi = async (
  data: LoginType,
  responseCallback: (response: AxiosResponse) => void,
) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/user/login/`,
      data,
      config,
    );
    responseCallback(response);
  } catch (error: any) {
    console.log('Login Api Error', error.message);
    responseCallback(error.response);
  }
};
export const SignUp = async (
  data: SignUpType,
  responseCallback: (response: AxiosResponse) => void,
) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/user/`,
      data,
      config,
    );
    responseCallback(response);
  } catch (error: any) {
    console.log('SignUp Api Error', error.message);
    responseCallback(error.response);
  }
};
