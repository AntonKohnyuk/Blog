export interface User {
  returnSecureToken?: boolean;
  email: string;
  password: string;
}

export interface FireBaseAuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}
