export const registerUserPasswordValidation = (
  password: string,
  confirmPassword: string,
) => {
  return password === confirmPassword ? true : false;
};
