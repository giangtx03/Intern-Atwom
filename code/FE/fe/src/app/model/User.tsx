export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  phoneNumber: string;
  fullname: string;
  retypePassword: string;
};

export type DecodedToken = {
  user_id: number;
  sub: string;
  exp: number;
  iat: number;
}

export type UserDetails = {
    id: number;
    email: string;
    phoneNumber: string;
    fullname: string;
    address: string;
    avatar: string;
    createAt: string;
    updateAt: string;
    role: string;
}