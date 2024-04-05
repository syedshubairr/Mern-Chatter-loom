import {convertToBase64} from '@/libs/ImageUpload';

export const handlePost = async (
  pics: FileList | null,
  toast: any,
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
export const onSubmit = () => {};
