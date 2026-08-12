export interface User {
  _id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  gender: "male" | "female";
  photo: string;
  token?: string;
}


export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  dateOfBirth: string;
  gender: "male" | "female";
}


export interface SignupResponse {
  message: string;
  token?: string;
  user?: User;
}


export interface SigninRequest {
  email: string;
  password: string;
}


export interface SigninResponse {
  message: string;
  token?: string;
  user?: User;
}


export interface ChangePasswordRequest {
  password: string;
  newPassword: string;
}


export interface ChangePasswordResponse {
  message: string;
}


export interface UploadPhotoResponse {
  message: string;
  user?: User;
}