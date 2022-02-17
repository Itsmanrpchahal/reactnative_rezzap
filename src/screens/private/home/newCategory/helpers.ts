import * as Yup from 'yup';

export const CATEGORY_SCHEMA = Yup.object().shape({
  title: Yup.string()
    .required('Category is required'),
});
