import React, { useState } from 'react';
import { Modal, Nav, Tab, Button } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { deleteBusinessDetailsByIdAction } from '../../../store/modules/partials/deleteBusiness';
import { deleteCauseDetailsByIdAction } from '../../../store/modules/partials/deleteCause';
import { getUserDetailssAction } from '../../../store/modules/categories/getcategory';
import { deleteParticipationByIdAction } from '../../../store/modules/partials/deleteParticipation';
import { getCauseDetailsByIdAction } from '../../../store/modules/partials/getCauseById';
import { getBusinessDetailsByIdAction } from '../../../store/modules/partials/getBusinessById';

import CauseModal from "./ModalForm/addCause"
import BusinessModal from "./ModalForm/addBusiness"
import toast from "../../../components/Notifier/Notifier";
interface MyModalProps {
  show: boolean;
  data: any; // Adjust the type of data according to your userProfile type
  onHide: () => void;
  editData: any
}

const MyModal: React.FC<MyModalProps> = ({ show, data, onHide, editData }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showCauseModal, setCauseModal] = useState(false);
  const [showBusinessModal, setBusinessModal] = useState(false);


  const dispatch = useDispatch()

  const [initialData, setInitialData] = useState({
    id: 0,
    title: "",
    description: "",
  });

  const [initialBusinessData, setInitialBusinessData] = useState({
    id:0,
    name:"",
    description:"",
    contact_person:"",
    contact_email:"",
    contact_phone:""
  })

  const handleTabSelect = (eventKey: string | null) => {
    if (eventKey) {
      setActiveTab(eventKey);
    }
  };


  const handleCloseModal = () => setCauseModal(false);
  const handleBusinessCloseModal = () => setBusinessModal(false)

  const handleCauseUpdate = async (id: number) => {
    // here is update
    const response: any = await dispatch<any>(getCauseDetailsByIdAction(id));
    if (response.status === 200) {
      const editData = {
        id: id,
        title: response.data.title,
        description: response.data.description
      }
      setInitialData(editData)
      setCauseModal(true)
    }
  }

  const handleBusinessUpdate = async (id: number) => {
    // here is update
    const response: any = await dispatch<any>(getBusinessDetailsByIdAction(id));
    if (response.status === 200) {
      const editBusinessData = {
        id: id,
        name: response.data.name,
        description: response.data.description,
        contact_person:response.data.contact_person,
        contact_email:response.data.contact_email,
        contact_phone:response.data.contact_phone
      }
      setInitialBusinessData(editBusinessData)
      setBusinessModal(true)
    }
  }

  const handleCauseDelete = async (id: number) => {
    const response: any = await dispatch<any>(deleteCauseDetailsByIdAction(id));
    if (response.status === 204) {
      dispatch<any>(getUserDetailssAction());
      toast.success("Cause Deleted Successfully.")
    }
    else {
      toast.error("Someting went wrong!")
    }
  }

  const handleBusinessDelete = async (id: number) => {
    const response: any = await dispatch<any>(deleteBusinessDetailsByIdAction(id));
    if (response.status === 204) {
      dispatch<any>(getUserDetailssAction());
      toast.success("Business Deleted Successfully.")
    }
    else {
      toast.error("Someting went wrong!")
    }
  }

  const handleParticipationsDelete = async (id: number) => {
    const response: any = await dispatch<any>(deleteParticipationByIdAction(id));
    if (response.status === 204) {
      dispatch<any>(getUserDetailssAction());
      toast.success("Participations Deleted Successfully.")
    }
    else {
      toast.error("Someting went wrong!")
    }
  }

  const renderTableRows = (rowData: any, strText: string) => {
    if (strText === 'cause') {

      return rowData.map((item: any) => (
        <>
          <div className='col' key={item.id}>
            <hr />
            <div className='col col-md-8'>
              <li>Title: {item.title}</li>
              <li>Description: {item.description}</li>
              <li>Created Date: {item.date_created}</li>
            </div>
            <div className='col col-md-4 p-3'>
              <Button className='btn btn-danger mr-2' onClick={() => handleCauseDelete(item.id)}><i className="bi bi-trash"></i> Delete</Button>
              <button className='btn btn-secondary mr-2' onClick={() => handleCauseUpdate(item.id)}><i className="bi bi-trash"></i> Edit</button>
            </div>
          </div>
        </>
      ));
    } else if (strText === 'participation') {
      return rowData.map((item: any) => (
        <>
          <div className='col' key={item.id}>
            <hr />
            <div className='col col-md-8'>
              <li>User: {item.cause__user__email}</li>
              <li>Cause: {item.cause__title}</li>
            </div>
            <div className='col col-md-4 p-3'>
              <Button className='btn btn-danger mr-2' onClick={() => handleParticipationsDelete(item.id)}><i className="bi bi-trash"></i> Delete</Button>
            </div>
          </div>
        </>
      ));
    }
    else {
      return rowData.map((item: any) => (
        <>
          <div className='col' key={item.id}>
            <hr />
            <div className='col col-md-8'>
              <li>Name: {item.name}</li>
              <li>Description: {item.description}</li>
              <li>Contact Person: {item.contact_person}</li>
              <li>Contact Emsil: {item.contact_email}</li>
              <li>Contact Number: {item.contact_phone}</li>
              <li>Appreoved Status: {item.admin_approved === true ? 'Approved' : 'Not Approved'}</li>
            </div>
            <div className='col col-md-4 p-3'>
              <Button className='btn btn-danger mr-2' onClick={() => handleBusinessDelete(item.id)}><i className="bi bi-trash"></i> Delete</Button>
              <button className='btn btn-secondary mr-2' onClick={() => handleBusinessUpdate(item.id)}><i className="bi bi-trash"></i> Edit</button>
            </div>
          </div>
        </>
      ));
    }
  };

  return (
    <div>

      <Modal show={show} onHide={onHide}>
        <Modal.Header>
          <Modal.Title>Mine Activities</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tab.Container activeKey={activeTab}>
            <Nav variant="tabs" onSelect={handleTabSelect}>
              <Nav.Item>
                <Nav.Link eventKey="profile">Cause</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="details">Business</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="participation">My Participation</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="profile">
                <div>
                  {data ? renderTableRows(data.cause, 'cause') : ''}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="details">
                <div>
                  {data ? renderTableRows(data.business, 'business') : ''}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="participation">
                <div>
                  <hr />
                  {data ? renderTableRows(data.participation, 'participation') : ''}
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <CauseModal show={showCauseModal} editData={initialData} onHide={handleCloseModal} />
      <BusinessModal show={showBusinessModal} editBusinessData={initialBusinessData} onHide={handleBusinessCloseModal} />

    </div>
  );
};

export default MyModal;
