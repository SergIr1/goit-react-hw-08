import PageTitle from '../../components/PageTitle/PageTitle';
import { MdContactPhone } from 'react-icons/md';
import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={css.container}>
      <PageTitle>
        <span className={css.title}>
          Welcome to the Phonebook App! <MdContactPhone className={css.icon} />
        </span>
      </PageTitle>

      <p className={css.text}>
        This is a simple application for saving and managing your contacts.
      </p>
    </div>
  );
}
