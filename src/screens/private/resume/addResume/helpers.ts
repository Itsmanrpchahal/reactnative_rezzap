import * as Yup from 'yup';

export const RESUME_SCHEMA = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Email entered is not valid')
    .required('Email is required'),
  phone: Yup.number().required('Phone is required'),
  profile: Yup.string().required('Profile is required'),
  category_names: Yup.string().required('Category is required'),
  activity_names: Yup.string().required('Activity is required'),
  supporters_ids: Yup.string().required('Supporter in required'),
  interest_names: Yup.string().required('Interest is required')
});