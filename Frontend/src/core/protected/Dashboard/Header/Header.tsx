import React, { useEffect, useState } from "react";
import { logoutAction } from "../../../../store/root-reducer";
import acsImage from '../../../../assets/images/acs.jpeg';

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/root-reducer";
import { getUserDetailssAction } from '../../../../store/modules/categories/getcategory';
import MyModal from "../bootstrapModal";
import CauseModal from "../ModalForm/addCause"
import BusinessModal from "../ModalForm/addBusiness"


interface AppHeaderProps {
  data: {
    name: string;
    description: string;
  } | null;
}

const AppHeader: React.FC<AppHeaderProps> = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [showBusinessModal, setBusinessModal] = useState(false);
  const [showCauseModal, setCauseModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) {
      return;
    }

    const smoothScrollLinks = document.querySelectorAll<HTMLAnchorElement>('.smoothscroll');

    const handleClick = function (event: MouseEvent) {
      event.preventDefault(); // Prevent the default behavior of the anchor tag.

      const targetId = (event.target as HTMLAnchorElement).getAttribute('href')?.substring(1);
      const targetElement = document.getElementById(targetId || '');

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
        });
      }
    };

    smoothScrollLinks.forEach((link) => {
      link.addEventListener('click', handleClick);
    });

    return () => {
      smoothScrollLinks.forEach((link) => {
        link.removeEventListener('click', handleClick);
      });
    };
  }, [data]);

  const handleShowModal = () => {
    setShowModal(true);
  };
  const OpenBusinessModal = () =>{
    setBusinessModal(true)
  }
  const OpenCausesModal = () =>{
    setCauseModal(true)
  }
  const handleCloseModal = () => setShowModal(false);
  const handleCloseCauseModal = () => setCauseModal(false);
  const handleCloseBusinessModal = () => setBusinessModal(false);
  const userProfile = useSelector(
    (state: RootState) => state.ProfileReducer.data
  );

  useEffect(() => {
    if (showModal) {
      dispatch<any>(getUserDetailssAction());
    }
  }, [showModal, dispatch]);

  if (!data) {
    return null;
  }

  const { name, description } = data;

  return (
    <header id="home">
      <nav id="nav-wrap">
        <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
          Show navigation
        </a>
        <a className="mobile-btn" href="#home" title="Hide navigation">
          Hide navigation
        </a>
        <ul id="nav" className="nav">
          <div className="logo-container">
            <img src={acsImage} alt="ACS Logo" />
          </div>
          <li className="current">
            <a className="smoothscroll" href="#home">
              Home
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#campaign">
              Campaign
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#contact">
              Contact
            </a>
          </li>
          <li>
            <button onClick={handleShowModal}>
              Profile
            </button>
          </li>
          <li>
            <button onClick={() => dispatch(logoutAction())}>
              LOGOUT
            </button>
          </li>
        </ul>
      </nav>
      <div className="row banner">
        <div className="banner-text">
          <h3>{description}.</h3>
          <br />
          <h2>{name}</h2>
          <br/><br/>
          <button onClick={OpenCausesModal} className="btn btn-primary mr-2">Join a Cause</button>
          <button onClick={OpenBusinessModal} className="btn btn-secondary mr-2">Explore Businesses</button>
        </div>
      </div>
      <p className="scrolldown">
        <a className="smoothscroll" href="#about">
          <i className="icon-down-circle"></i>
        </a>
      </p>
      <div>
        <MyModal show={showModal} data={userProfile} editData={''} onHide={handleCloseModal} />
        <CauseModal show={showCauseModal} editData={''} onHide={handleCloseCauseModal} />
        <BusinessModal show={showBusinessModal} editBusinessData={''} onHide={handleCloseBusinessModal} />

        
      </div>
    </header>
  );
};

export default AppHeader;
