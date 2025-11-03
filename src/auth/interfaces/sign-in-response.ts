export interface SignInResponse {
  id: string;
  username: string | null;
  email: string;
  // access_token: string;
}

export interface GoogleProfile {
  id: string;
  emails: { value: string }[];
  name: {
    givenName: string;
    familyName: string;
  };
}
