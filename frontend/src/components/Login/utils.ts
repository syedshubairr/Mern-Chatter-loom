import { setUserData } from "@/redux/slices/userSlice";
import { LoginApi } from "@/services/auth";
import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { NextRouter } from "next/router";

export const onLogin = (
  email: string,
  password: string,
  setIsError: (val: boolean) => void,
  setIsLoading: (val: boolean) => void,
  resetState: () => void,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  router: NextRouter,
  dispatch: any
) => {
  if (!email || !password) {
    setIsError(true);
    toast({
      title: "Please fill all the fields.",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    return;
  }
  setIsLoading(true);
  const payload = {
    email,
    password,
  };
  LoginApi(payload, async (response: AxiosResponse) => {
    setIsLoading(false);
    console.log("RESPONSE Login", response);
    if (response.status === 200) {
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      dispatch(setUserData(response.data));
      resetState();
      router.push("/chats");
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } else {
      resetState();
      toast({
        title: response.data.error ? response.data.error : "Unable to Login",
        status: response.data.error ? "error" : "info",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  });
};
