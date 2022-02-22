import * as Yup from 'yup';

export const FIND_SUPPORTER_SCHEMA = Yup.object().shape({
  
  keyword: Yup.string().required('Supporter name is required'),
});
