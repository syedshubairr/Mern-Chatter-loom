export interface UserState {
  userData: userDataType;
}
export type userDataType = {
  email: string;
  name: string;
  pic: string;
  token: string;
  _id: string;
};
