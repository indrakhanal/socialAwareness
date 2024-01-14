import React from "react"
import ParticlesBg from "particles-bg"
import {logoutAction} from '../../../../store/root-reducer' 
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll'

// import Fade from "react-reveal/Fade"

interface AppHeaderProps {
  data: {
    project: string;
    github: string;
    name: string;
    description: string;
  };
}

const AppHeader: React.FC<AppHeaderProps> = ({ data }) => {
  if (!data) return null;

  const { project, github, name, description } = data;

  return (
    <header id="home">
      <ParticlesBg type="circle" bg={true} />

      <nav id="nav-wrap">
        <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
          Show navigation
        </a>
        <a className="mobile-btn" href="#home" title="Hide navigation">
          Hide navigation
        </a>
        <ul id="nav" className="nav">
          <li className="current smoothscroll">
            <ScrollLink to="home" smooth={true} duration={500}>
              Home
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="campaign" smooth={true} duration={500}>
              Campaign
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="contact" smooth={true} duration={500}>
              Contact
            </ScrollLink>
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
          {/* <Fade bottom> */}
            <h1 className="responsive-headline">{name}</h1>
          {/* </Fade> */}
          {/* <Fade bottom duration={1200}> */}
            <h3>{description}.</h3>
          {/* </Fade> */}
          <hr />
          {/* <Fade bottom duration={2000}> */}
            {/* <ul className="social">
              <a href={project} className="button btn project-btn">
                <i className="fa fa-book"></i>Project
              </a>
              <a href={github} className="button btn github-btn">
                <i className="fa fa-github"></i>Github
              </a>
            </ul> */}
          {/* </Fade> */}
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
