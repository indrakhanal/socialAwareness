import React, { useState } from 'react';
import { Modal, Nav, Tab, Button, Table } from 'react-bootstrap';

interface MyModalProps {
  show: boolean;
  data: any; // Adjust the type of data according to your userProfile type
  onHide: () => void;
}           

const DetailModal: React.FC<MyModalProps> = ({ show, data, onHide }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Detail View</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailModal;
