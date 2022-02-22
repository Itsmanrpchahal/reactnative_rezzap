export interface LoginResponseInterface {
  access_token: string;
  email_confirmed : string;
}

export interface ResponseRoot {
  data: LoginResponseInterface;
}

export interface CommonInterface {
  actionFN: () => void;
}

export interface LoginInterface {
  email: string;
  password: string;
}

export interface ForgotInterface {
  email:string;
}

export  interface SignUpInterface {
  first_name :string;
  last_name :string;
  email :string;
  password :string;
  mobile :string;
  account_type :string
  social_media :string
  address :string
  street:string
  city :string
  state :string
  zip :string
  dob : string
  gender: string
}
