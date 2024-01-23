import React, { useEffect } from "react";
import { logoutAction } from "../../../../store/root-reducer";
import acsImage from '../../../../assets/images/acs.jpeg';


interface AppHeaderProps {
  data: {
    name: string;
    description: string;
  } | null;
}

const AppHeader: React.FC<AppHeaderProps> = ({ data }) => {
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

  if (!data) {
    return null;
  }

  const { name, description } = data;

  return (
    <header id="home">
      {/* <ParticlesBg type="circle" bg={true} /> */}

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
            <a className="smoothscroll" onClick={logoutAction}>
              LOGOUT
            </a>
          </li>
        </ul>
      </nav>

      <div className="row banner">
        <div className="banner-text">
          {/* <h1 className="responsive-headline">{name}</h1> */}
          <h3>{description}.</h3>
          <br />
         <h2>{name}</h2> 

          <a href="#" className="btn btn-primary">Join a Cause</a>
      <a href="#" className="btn btn-secondary">Explore Businesses</a>
        </div>
      </div>

      <p className="scrolldown">  
        <a className="smoothscroll" href="#about">
          <i className="icon-down-circle"></i>
        </a>
      </p>
    </header>
  );
};

export default AppHeader;
