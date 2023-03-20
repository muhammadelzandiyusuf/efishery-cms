import { Modal } from 'react-bootstrap';
import Button from '@/components/Button';

import './form.scss';
import Loading from '@/components/Loading';

const FormDelete = ({ show, onHide, message, id, handleDelete, loading }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size='md'
      fullscreen='sm-down'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Body className='show-grid'>
        <p>
          {message} <b>{id}</b> ?
        </p>
        <div className='modal-action'>
          <Button variant='default' onClick={onHide}>
            Tidak
          </Button>
          <Button variant='primary' onClick={handleDelete}>
            {loading ? <Loading width='21px' height='21px' color='#ffffff' /> : 'Ya'}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default FormDelete;
