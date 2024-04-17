export interface UploadPicType {
  data: FormData;
}
export interface SignUpType {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  pic: unknown;
}
export interface LoginType {
  email: string;
  password: string;
}
