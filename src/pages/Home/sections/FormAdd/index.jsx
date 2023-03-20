import { Modal } from 'react-bootstrap';
import JsonToForm from 'json-reactform';

const FormAdd = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size='md'
      fullscreen={'sm-down'}
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          {props.formType === 'add' ? 'Tambah Komoditas' : 'Edit Komoditas'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='show-grid'>
        {props.onLoadSchema && <JsonToForm model={props.schema} onSubmit={props.onSubmit} />}
      </Modal.Body>
    </Modal>
  );
};

export default FormAdd;
