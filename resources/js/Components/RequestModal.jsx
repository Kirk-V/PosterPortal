import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function RequestModal({requestData}) {

  return (
    <Modal
        size="lg"
        centered>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            {requestData.request_id}
            </Modal.Title>
      </Modal.Header>

    </Modal>
  );
}

export default StaticExample;