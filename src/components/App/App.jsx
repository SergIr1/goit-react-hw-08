import css from './App.module.css';

import Layout from '../Layout/Layout.jsx';
import { Route, Routes } from 'react-router-dom';

import HomePage from '../../pages/HomePage/HomePage.jsx';
import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage.jsx';
import LoginPage from '../../pages/LoginPage/LoginPage';
import ContactsPage from '../../pages/ContactsPage/ContactsPage.jsx';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '../../redux/auth/operations.js';
import { selectIsRefreshing } from '../../redux/auth/selectors.js';
import RestrictedRoute from '../RestrictedRoute/RestrictedRoute.jsx';
import PrivateRoute from '../PrivateRoute/PrivateRoute.jsx';
import { Toaster } from 'react-hot-toast';
import ModalDeleteContact from '../ModalDeleteContact/ModalDeleteContact.jsx';

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  // airazur2710@gmail.com
  //     1234567
  // airazur2701@gmail.com
  //     1234567
  return isRefreshing ? (
    <p className={css.text}>Getting user data please waite...</p>
  ) : (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute
              component={<RegistrationPage />}
              redirectTo="/contacts"
            />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute component={<LoginPage />} redirectTo="/contacts" />
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute component={<ContactsPage />} redirectTo="/login" />
          }
        />
      </Routes>
      <ModalDeleteContact />
      <Toaster />
    </Layout>
  );
}
