import * as Yup from 'yup';

export const SIGNUP_SCHEMA = Yup.object().shape({
  first_name: Yup.string()
    .required('Firstname is required'),
  last_name: Yup.string().required('Lastname is required'),
  email: Yup.string()
    .email('Email entered is not valid')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
  social_media:Yup.string()
    .required('REZZAP userId is required'),

});
