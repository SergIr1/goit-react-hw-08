import { Field, Form, Formik, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/auth/operations';
import * as Yup from 'yup';
import { selectUserError, selectUserLoading } from '../../redux/auth/selectors';
// import { clearError } from '../../redux/auth/slice';
import css from './RegistrationForm.module.css';
import toast from 'react-hot-toast';

const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Must be at least 3 characters')
    .max(50, 'Must be 50 characters or less')
    .required('Name is required'),
  email: Yup.string().email().required('Email is required'),
  // .min(3, 'Must be at least 3 characters')
  // .max(50, 'Must be 50 characters or less')
  // .required('Email is required'),
  password: Yup.string()
    .min(7, 'Must be at least 7 characters')
    .max(50, 'Must be 50 characters or less')
    .required('Password is required'),
});

// Sorry! Password Min allowed lenght(7), Email min(13)

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const error = useSelector(selectUserError);
  const isLoading = useSelector(selectUserLoading);

  const handleSubmit = (values, actions) => {
    // console.log('value', values);
    // console.log('actions', actions);

    dispatch(register(values))
      .unwrap()
      .then(() => {
        toast.success('Logged into the application!', {
          duration: 1750,
          position: 'top-right',
        });
        // navigate('/contacts');
        // console.log('Login success');
      })
      .catch(() => {
        toast.error(
          'Sorry! Password Min allowed lenght(7). The email address must contain the "@" symbol.',
          {
            duration: 2750,
            position: 'top-right',
          }
        );
      });
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      validationSchema={UserSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label className={css.label}>
          Username
          <Field className={css.input} type="text" name="name" />
        </label>
        <ErrorMessage className={css.error} name="name" component={'span'} />
        <label className={css.label}>
          Email
          <Field className={css.input} type="email" name="email" />
          {/* <Field name="email">
            {({ field }) => (
              <input
                {...field}
                type="email"
                className={css.input}
                onChange={e => {
                  field.onChange(e);
                  if (error) {
                    dispatch(clearError());
                  }
                }}
              />
            )}
          </Field> */}
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
          Register
        </button>
        {error && (
          <p className={css.text}>Such email is registered, try another one</p>
        )}
        {isLoading && <p className={css.textLoading}>Loading...</p>}
      </Form>
    </Formik>
  );
}
