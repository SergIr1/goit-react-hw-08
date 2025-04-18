import css from './Contact.module.css';
import { FaUser } from 'react-icons/fa';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
// import { deleteContact } from '../../redux/contacts/operations.js';
// import toast from 'react-hot-toast';
import { openDeleteModal, openEditModal } from '../../redux/modal/slice.js';

export default function Contact({ data: { name, number, id } }) {
  const dispatch = useDispatch();

  const handeleDelete = () => {
    // dispatch(deleteContact(id))
    dispatch(openDeleteModal({ id, name, number }));
    // .unwrap()
    // .then(() => {
    //   toast.success('Contact Deleted!', {
    //     duration: 1750,
    //     position: 'top-right',
    //   });
    // });
  };
  return (
    <div className={css.container}>
      <div>
        <div className={css.wrapper}>
          <FaUser className={css.icon} />
          <p className={css.text}>{name}</p>
        </div>
        <div className={css.wrapper}>
          <BsFillTelephoneFill className={css.icon} />
          <p className={css.text}>{number}</p>
        </div>
      </div>
      {/* <button className={css.button} type="button" onClick={() => onDelete(id)}> */}
      <div>
        <button
          className={css.button}
          type="button"
          onClick={() => dispatch(openEditModal({ id, name, number }))}
        >
          Edit
        </button>
        <button className={css.button} type="button" onClick={handeleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
