import * as Yup from 'yup';

export const SEND_MESSAGE_SCHEMA = Yup.object().shape({
  message: Yup.string()
    .required('Message is required'),
});
