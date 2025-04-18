import PageTitle from '../../components/PageTitle/PageTitle';
import ContactList from '../../components/ContactList/ContactList';
import { selectLoading } from '../../redux/contacts/selectors.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/contacts/operations.js';
import ContactForm from '../../components/ContactForm/ContactForm.jsx';
import SearchBox from '../../components/SearchBox/SearchBox';
import ModalEditContact from '../../components/ModalEditContact/ModalEditContact.jsx';
import ModalDeleteContact from '../../components/ModalDeleteContact/ModalDeleteContact.jsx';

export default function ContactsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  // const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <PageTitle>Your contacts</PageTitle>
      <ContactForm />
      <SearchBox />
      <div>{isLoading && 'Request in progress...'}</div>
      <ContactList />
      <ModalEditContact />
      <ModalDeleteContact />
    </>
  );
}
