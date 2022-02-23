import * as Yup from 'yup';

export const LOGIN_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .email('Email entered is not valid')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});


export const FORGOT_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .email('Email entered is not valid')
    .required('Email is required'),
})


export const RESET_PASSWORD_SCHEMA = Yup.object().shape({
 
    otp:Yup.string().required('OTP required'),
    password: Yup.string().required('Password is required'),
})
