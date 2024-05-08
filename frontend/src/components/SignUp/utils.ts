import {convertToBase64} from '@/libs/ImageUpload';
import {SignUp} from '@/services/auth';
import {ToastId, UseToastOptions} from '@chakra-ui/react';
import {AxiosResponse} from 'axios';

export const handlePost = async (
  pics: FileList | null,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  setLoading: (val: boolean) => void,
  setPic: (val: string) => void,
) => {
  if (pics === undefined || pics === null || pics.length === 0) {
    toast({
      title: 'Profile Picture is Required',
      description: 'Please select a picture',
      status: 'warning',
      duration: 5000,
      isClosable: true,
      position: 'bottom',
    });
    return;
  }
  // console.log(pics[0].size);
  // if (pics[0].size / 1024 > 2500) {
  //   toast({
  //     title: 'Profile Picture is Required',
  //     description: 'Please select a picture',
  //     status: 'warning',
  //     duration: 5000,
  //     isClosable: true,
  //     position: 'bottom',
  //   });
  //   return;
  // }
  setLoading(true);
  const base64 = await convertToBase64(pics[0]);
  setPic(base64);
  console.log('Picture to base64', base64);
  setLoading(false);
};
export const onSubmit = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  pic: unknown,
  setIsError: (val: boolean) => void,
  setLoading: (val: boolean) => void,
  toast: (options?: UseToastOptions | undefined) => ToastId,
) => {
  setLoading(true);
  if (!name || !email || !password || !confirmPassword) {
    setIsError(true);
    setLoading(false);
    toast({
      title: 'Please fill all the fields.',
      status: 'warning',
      duration: 5000,
      isClosable: true,
      position: 'bottom',
    });
    return;
  }
  if (password !== confirmPassword) {
    setLoading(false);
    toast({
      title: 'Password and Confirm Password does not match',
      status: 'warning',
      duration: 5000,
      isClosable: true,
      position: 'bottom',
    });
    return;
  }
  const payload = {
    name,
    email,
    password,
    confirmPassword,
    pic,
  };
  SignUp(payload, async (response: AxiosResponse) => {
    setLoading(false);
    console.log('RESPONSE signup', response);
    if (response.status === 200) {
      toast({
        title: 'User Created',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    } else {
      toast({
        title: response.data.error ? response.data.error : 'Unable to Sign Up',
        status: response.data.error ? 'error' : 'info',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }
  });
};
