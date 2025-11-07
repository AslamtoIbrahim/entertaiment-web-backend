export interface JwtPayload {
  id: string;
  email: string;
}
export interface Payload {
  sub: string;
  email: string;
}

export interface Profile {
  sub: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
}
