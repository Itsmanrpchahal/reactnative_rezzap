import * as Yup from 'yup';

export const ADD_ACTIVITY_SCHEMA = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  category: Yup.string().required('Category is required'),
});
