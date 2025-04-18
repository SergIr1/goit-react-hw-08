import Modal from 'react-modal';
import css from './ModalDeleteContact.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import { closeModal } from '../../redux/modal/slice';
// import { selectModalState } from '../../redux/modal/selectors';
import toast from 'react-hot-toast';

Modal.setAppElement('#root');

export default function ModalDeleteContact() {
  const dispatch = useDispatch();
  //   const { isOpen, contactId } = useSelector(selectModalState);
  const { isOpen, type, data } = useSelector(state => state.modal);

  if (!isOpen || type !== 'delete') return null;

  const handleDelete = () => {
    dispatch(deleteContact(data.id))
      .unwrap()
      .then(() => {
        toast.success('Contact Deleted!', {
          duration: 1750,
          position: 'top-right',
        });
      })
      .catch(() => {
        toast.error('Failed to delete contact.');
      });
    dispatch(closeModal());
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => dispatch(closeModal())}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <div className={css.content}>
        <p className={css.text}>
          Are you sure you want to delete this contact?
        </p>
        <button className={css.confirm} onClick={handleDelete}>
          Yes
        </button>
        <button className={css.cancel} onClick={() => dispatch(closeModal())}>
          No
        </button>
      </div>
    </Modal>
  );
}
