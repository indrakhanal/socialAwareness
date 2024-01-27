import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from "react-redux";
import toast from "../../../../components/Notifier/Notifier";
import { addBusiness } from '../../../../store/modules/partials/addBusiness'


interface MyModalProps {
    show: boolean;
    onHide: () => void;
  }
  
  interface BusinessDetails {
    name :string	
    description :string	
    contact_person :string	
    contact_email :string	
    contact_phone :string	
}  

const BusinessModal: React.FC<MyModalProps> = ({ show, onHide }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [contactPerson, setcontactPerson] = useState('');
    const [contactEmail, setcontactEmail] = useState('');
    const [contactPhone, setcontactPhone] = useState('');

    const dispatch = useDispatch();
    const handleSave = async (userDetails: BusinessDetails) => {
        const response: any = await dispatch<any>(addBusiness(userDetails));
        if(response.status === 201){
            setName('');
            setDescription('')
            setcontactPerson('')
            setcontactEmail('')
            setcontactPhone('')
            toast.success("Cause Created Successfully")
        }else{
            toast.error("Something Went Wrong!")
        }
    };

    const handleSubmit = () => {
        const businessDetails: BusinessDetails = {
            name: name,
            description: description,
            contact_person: contactPerson,
            contact_phone:contactPhone,
            contact_email:contactEmail,
        };

        handleSave(businessDetails);
    };
  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header>
          <Modal.Title>Add Business Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={2} 
              value={description}
              onChange={(e) => setDescription(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Contact Person</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter contact Person Name"
                value={contactPerson}
                onChange={(e) => setcontactPerson(e.target.value)}
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Contact Phone</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter contact person's phone number"
                value={contactPhone}
                onChange={(e) => setcontactPhone(e.target.value)}
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Contact Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Contact Email"
                value={contactEmail}
                onChange={(e) => setcontactEmail(e.target.value)}
                autoFocus
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BusinessModal;