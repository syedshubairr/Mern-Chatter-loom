import { searchApi } from "@/services/user";
import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { AxiosResponse } from "axios";

export const handleSearch = async (
  search: string,
  setLoading: (val: boolean) => void,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  dispatch: any
) => {
  if (!search) {
    toast({
      title: "Please enter something to search",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "top-left",
    });
    return;
  }
  try {
    const payload = {
      name: search,
    };
    setLoading(true);
    dispatch(
      searchApi(payload, (response: AxiosResponse) => {
        setLoading(false);
      })
    );
  } catch (error) {
    toast({
      title: "Error Occurred!",
      description: "Failed to load Search Result",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-left",
    });
  }
};
