import { Field, Form, Formik, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { selectUserError, selectUserLoading } from '../../redux/auth/selectors';
import { login } from '../../redux/auth/operations';
import toast from 'react-hot-toast';

import css from './LoginForm.module.css';
// import { useNavigate } from 'react-router-dom';

const UserSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string()
    .min(7, 'Must be at least 7 characters')
    .max(50, 'Must be 50 characters or less')
    .required('Password is required'),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const error = useSelector(selectUserError);
  const isLoading = useSelector(selectUserLoading);

  const handleSubmit = (values, actions) => {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        toast.success('Logged into the application!', {
          duration: 1750,
          position: 'top-right',
        });
        // navigate('/contacts');
        console.log('Login success');
      })
      .catch(() => {
        toast.error('Invalid email or password!', {
          duration: 1750,
          position: 'top-right',
        });
      });
    actions.resetForm();
  };

  return isLoading ? (
    <p className={css.textLoading}>Loading...</p>
  ) : (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={UserSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label className={css.label}>
          Email
          <Field className={css.input} type="email" name="email" />
        </label>
        {/* {error && <p className={css.error}>Fill in this field</p>} */}
        <ErrorMessage className={css.error} name="email" component={'span'} />
        <label className={css.label}>
          Password
          <Field className={css.input} type="password" name="password" />
        </label>
        <ErrorMessage
          className={css.error}
          name="password"
          component={'span'}
        />
        <button className={css.button} type="submit">
          Log In
        </button>
        {error && (
          <p className={css.text}>
            Error email or password is registered, try again
          </p>
        )}
        {/* {isLoading && <p className={css.textLoading}>Loading...</p>} */}
      </Form>
    </Formik>
  );
}
