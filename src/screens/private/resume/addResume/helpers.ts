import * as Yup from 'yup';

export const RESUME_SCHEMA = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Email entered is not valid')
    .required('Email is required'),
  phone: Yup.number().required('Phone is required'),
  profile: Yup.string().required('Profile is required'),
});