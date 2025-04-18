import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editContact } from '../../redux/contacts/operations';
import { closeModal } from '../../redux/modal/slice';

import css from './ModalEditContact.module.css';
import toast from 'react-hot-toast';

Modal.setAppElement('#root');

export default function ModalEditContact() {
  const dispatch = useDispatch();
  // const { isOpen, editingContact } = useSelector(state => state.modal);
  const { isOpen, type, data } = useSelector(state => state.modal);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    if (data) {
      setName(data.name);
      setNumber(data.number);
    }
  }, [data]);

  if (!isOpen || type !== 'edit') return null;

  const handleSubmit = e => {
    e.preventDefault();
    if (!name.trim() || !number.trim()) {
      toast.error('Name and Number are required.');
      return;
    }
    dispatch(
      editContact({
        id: data.id,
        updatedData: { name, number },
      })
    )
      .unwrap()
      .then(() => dispatch(closeModal()));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => dispatch(closeModal())}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <h2 className={css.title}>Edit Contact</h2>
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.label}>
          Name
          <input
            autoFocus
            className={css.input}
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <label className={css.label}>
          Number
          <input
            className={css.input}
            type="text"
            value={number}
            onChange={e => setNumber(e.target.value)}
          />
        </label>
        <div className={css.buttons}>
          <button type="submit" className={css.save}>
            Save
          </button>
          <button
            type="button"
            onClick={() => dispatch(closeModal())}
            className={css.cancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
