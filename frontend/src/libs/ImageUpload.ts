export const convertToBase64 = (picture: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(picture);
    fileReader.onload = () => {
      resolve(fileReader.result?.toString());
    };
    fileReader.onerror = error => {
      reject(error);
    };
  });
};
