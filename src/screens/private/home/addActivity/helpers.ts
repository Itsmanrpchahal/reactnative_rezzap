import * as Yup from 'yup';

export const ADD_ACTIVITY_SCHEMA = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  category: Yup.string().required('Category is required'),
});

export const ADD_ACTIVITY_SCHEMA1 = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  category: Yup.string().required('Category is required'),
  content: Yup.string().required('Content is required'),
});
