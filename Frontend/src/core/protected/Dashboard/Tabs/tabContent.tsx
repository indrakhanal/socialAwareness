import React, { useState, useEffect } from 'react';
import { Modal, Nav, Tab, Button, Table } from 'react-bootstrap';
import './tabs.css'
import { useDispatch, useSelector } from "react-redux";
import { getCauseDetailsByIdAction } from '../../../../store/modules/partials/getCauseById';
import { getBusinessDetailsByIdAction } from '../../../../store/modules/partials/getBusinessById';

import { RootState } from "../../../../store/root-reducer";
import DetailModal from '../ModalForm/detailModal';

interface MyModalProps {
    data: any;
    options: string;
}


const calculatePostedTime = (date: any) => {
    const createdTime = new Date(date);
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - createdTime.getTime();

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let formattedTime = "";
    if (days > 0) {
        formattedTime = `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
        formattedTime = `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
        formattedTime = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
        formattedTime = `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    }
    return formattedTime

};


const TabContent: React.FC<MyModalProps> = ({ data, options }) => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [showBusinessModal, setshowBusinessModal] = useState(false);
  const handleShowModal = (id:any) => {
    dispatch<any>(getCauseDetailsByIdAction(id))
    setShowModal(true);
  };

  const handleSBusinesshowModal = (id:any) =>{
    dispatch<any>(getBusinessDetailsByIdAction(id))
    setshowBusinessModal(true)
  }
  const handleCloseModal = () => setShowModal(false);
  const handleClosBusinesseModal = () => setshowBusinessModal(false)

  const causeData = useSelector(
    (state: RootState) => state.getCauseDetailsByIdActionReducer.data
  );


  const businesseData = useSelector(
    (state: RootState) => state.getBusinessDetailsByIdActionReducer.data
  );
//   useEffect(() => {
//     if (showModal) {
//       dispatch<any>(getUserDetailssAction());
//     }
//   }, [showModal, dispatch]);
    if (options === 'cause') {
        return (
            <>
                <div className="user-list container">
                    <div className='row'>
                        {data ? data.cause.map((item: any) => (
                            <div key={`user-${item.id}`} className="user-list__item col col-md-5 mr-6 mt-4 p-4">
                                <div className='row'>
                                    <div className='col col-md-6'>
                                        <div className="user-list__name">User: {item.user__email}</div>
                                        <div className="user-list__address">Title: {item.title}</div>
                                        <div className="user-list__country">Created Time: {calculatePostedTime(item.date_created)}</div>

                                    </div>
                                    <div className='col col-md-6 mt-6'>
                                        <button className='btn btn-primary mr-2 float-right'>Join</button>
                                        <button className='btn btn-primary mr-2 float-right' onClick={() => handleShowModal(item.id)}>view detail</button>
                                    </div>
                                </div>

                            </div>
                        )) : ''}
                    </div>
                </div>
                {causeData?
                <DetailModal show={showModal} data={causeData} onHide={handleCloseModal}/>
                :''
                }
            </>
        );
    } else {
        return (
            <>
                <div className="user-list container">
                    <div className='row'>
                        {data ? data.business.map((item: any) => (
                            <div key={`user-${item.id}`} className="user-list__item col col-md-5 mr-6 mt-4 p-4">
                                <div className='row'>
                                    <div className='col col-md-6'>
                                        <div className="user-list__name">User: {item.user__email}</div>
                                        <div className="user-list__address">Title: {item.name}</div>
                                        <div className="user-list__country">Created Time: {calculatePostedTime(item.date_created)}</div>
                                    </div>
                                    <div className='col col-md-6 mt-6'>
                                        <button className='btn btn-primary mr-2 float-right'>Join</button>
                                        <button className='btn btn-primary mr-2 float-right' onClick={() => handleSBusinesshowModal(item.id)}>view detail</button>
                                    </div>
                                </div>

                            </div>
                        )) : ''}
                    </div>
                </div>
                {businesseData?
                <DetailModal show={showBusinessModal} data={businesseData} onHide={handleClosBusinesseModal}/>
                :''
                }
            </>
        );
    }
};

export default TabContent;
