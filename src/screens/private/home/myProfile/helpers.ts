import * as Yup from 'yup';

export const UPDATEPROFILE_SCHEMA = Yup.object().shape({
  first_name: Yup.string().required('Firstname is required'),
  last_name: Yup.string().required('Lastname is required'),
  mobile: Yup.string().required('Mobile is required'),
  address: Yup.string().required('Address is required'),
  street: Yup.string().required('Street is required'),
  highschool: Yup.string().required('Highschool is required'),
  college: Yup.string().required('College is required'),
  degree: Yup.string().required('Degree is required'),

});
