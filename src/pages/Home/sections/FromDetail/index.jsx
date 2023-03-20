import { Modal, Container, Row, Col } from 'react-bootstrap';
import { convertDate } from '@/utils/convertDate';
import { formatCurrency } from '@/utils/formatCurrency';

import './detail.scss';

const FormDetail = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size='lg'
      fullscreen='sm-down'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Detail Komoditas</Modal.Title>
      </Modal.Header>
      <Modal.Body className='show-grid'>
        <Container>
          <Row>
            <Col xs={12} sm={12} md={6} lg={6}>
              <label className='label'>Komoditas</label>
              <p>{props.detail.komoditas}</p>

              <label className='label'>Provinsi</label>
              <p>{props.detail.area_provinsi}</p>

              <label className='label'>Kota</label>
              <p>{props.detail.area_kota}</p>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <label className='label'>Ukuran</label>
              <p>{props.detail.size}</p>

              <label className='label'>Harga</label>
              <p>Rp. {formatCurrency(props.detail.price, undefined, '.')}</p>

              <label className='label'>Tanggal Dibuat</label>
              <p>{convertDate(props.detail.tgl_parsed, 'DD MMMM YYYY')}</p>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default FormDetail;
