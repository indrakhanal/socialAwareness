import React, { useState } from 'react';
import { Modal, Nav, Tab, Button, Table } from 'react-bootstrap';

interface MyModalProps {
  show: boolean;
  data: any; // Adjust the type of data according to your userProfile type
  onHide: () => void;
}           

const MyModal: React.FC<MyModalProps> = ({ show, data, onHide }) => {
  const [activeTab, setActiveTab] = useState('profile');

  const handleTabSelect = (eventKey: string | null) => {
    if (eventKey) {
      setActiveTab(eventKey);
    }
  };
  const DeleteData = (id:number) => {
    console.log(id)
  }

  const renderTableRows = (rowData: any, strText:string) => {
    if(strText === 'cause'){

      return rowData.map((item:any) => (
       <>
         <div className='col' key={item.id}>
            <hr/>
           <div className='col col-md-8'>
           <li>Title: {item.title}</li>
           <li>Description: {item.description}</li>
           <li>Created Date: {item.date_created}</li>
           </div>
           <div className='col col-md-4 p-3'>
           <Button className='btn btn-danger mr-2'><i className="bi bi-trash"></i> Delete</Button>
           <button className='btn btn-secondary mr-2'><i className="bi bi-trash"></i> Edit</button>
           </div>
         </div>
       </>
       ));
    }else{
      return rowData.map((item:any) => (
        <>
          <div className='col' key={item.id}>
            <hr/>
           <div className='col col-md-8'>
            <li>Name: {item.name}</li>
            <li>Description: {item.description}</li>
            <li>Contact Person: {item.contact_person}</li>
            <li>Contact Emsil: {item.contact_email}</li>
            <li>Contact Number: {item.contact_phone}</li>
            <li>Appreoved Status: {item.admin_approved===true?'Approved':'Not Approved'}</li>
            </div>
            <div className='col col-md-4 p-3'>
           <Button className='btn btn-danger mr-2'><i className="bi bi-trash"></i> Delete</Button>
           <button className='btn btn-secondary mr-2'><i className="bi bi-trash"></i> Edit</button>
           </div>
          </div>
        </>
        ));
    }
  };

  return (
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
              {data?renderTableRows(data.cause, 'cause'):''}
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="details">
              <div>
              {data?renderTableRows(data.business, 'business'):''}
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="participation">
              <div>
                <hr/>
              <p>My Participation List Here</p>
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
  );
};

export default MyModal;
