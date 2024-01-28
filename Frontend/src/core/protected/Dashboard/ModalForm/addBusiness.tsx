import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from "react-redux";
import toast from "../../../../components/Notifier/Notifier";
import { addBusiness } from '../../../../store/modules/partials/addBusiness'
import { UpdateBusinessDetailsByIdAction } from '../../../../store/modules/partials/updateBusiness'
import { getUserDetailssAction } from '../../../../store/modules/categories/getcategory';


interface MyModalProps {
  show: boolean;
  onHide: () => void;
  editBusinessData: any
}

interface BusinessDetails {
  name: string
  description: string
  contact_person: string
  contact_email: string
  contact_phone: string
}

const BusinessModal: React.FC<MyModalProps> = ({ show, onHide, editBusinessData }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [contactPerson, setcontactPerson] = useState('');
  const [contactEmail, setcontactEmail] = useState('');
  const [contactPhone, setcontactPhone] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (editBusinessData) {
      setName(editBusinessData.name || '');
      setDescription(editBusinessData.description || '');
      setcontactPerson(editBusinessData.contact_person || '')
      setcontactEmail(editBusinessData.contact_email || '')
      setcontactPhone(editBusinessData.contact_phone || '')
    } else {
      setName('');
      setDescription('');
      setcontactPerson('')
      setcontactEmail('')
      setcontactPhone('')
    }
  }, [editBusinessData]);

  const handleSave = async (userDetails: BusinessDetails) => {
    if (editBusinessData.id) {
      const response: any = await dispatch<any>(UpdateBusinessDetailsByIdAction(userDetails, editBusinessData.id));
      if (response.status === 200) {
        setName('');
        setDescription('')
        setcontactPerson('')
        setcontactEmail('')
        setcontactPhone('')
        toast.success("Business Update Successfully")
        onHide()
        dispatch<any>(getUserDetailssAction());
      } else {
        try {
          if (response.message && response.status===400) {
            Object.keys(response.message).forEach((key: string) => {
              const errorMessage = response.message[key];
              toast.error(`${key}:${errorMessage[0]}`);
            });
          } else if(response.status === 500) {
            toast.error("Server Error Encountered");
          }else{
            toast.error("Something Went Wrong");

          }
        } catch (error) {
          toast.error(`${error}`);
        }
      }
    } else {
      const response: any = await dispatch<any>(addBusiness(userDetails));
      if (response.status === 201) {
        setName('');
        setDescription('')
        setcontactPerson('')
        setcontactEmail('')
        setcontactPhone('')
        toast.success("Business Created Successfully")
      } else {
        try {
          if (response.message && response.status===400) {
            Object.keys(response.message).forEach((key: string) => {
              const errorMessage = response.message[key];
              toast.error(`${key}:${errorMessage[0]}`);
            });
          } else if(response.status === 500) {
            toast.error("Server Error Encountered");
          }else{
            toast.error("Something Went Wrong");

          }
        } catch (error) {
          toast.error(`${error}`);
        }
      }
    }
  };

  const handleSubmit = () => {
    const businessDetails: BusinessDetails = {
      name: name,
      description: description,
      contact_person: contactPerson,
      contact_phone: contactPhone,
      contact_email: contactEmail,
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
                onChange={(e) => setDescription(e.target.value)} />
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