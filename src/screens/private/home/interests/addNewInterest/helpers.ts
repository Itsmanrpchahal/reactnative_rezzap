import * as Yup from 'yup';

export const INTEREST_SCHEMA = Yup.object().shape({
  title: Yup.string()
    .required('Title is required'),
  url: Yup.string()
    .url('Url entered is not valid')
    .required('URL is required'),

});
