import React, { useEffect } from "react";
import ParticlesBg from "particles-bg";
import { logoutAction } from "../../../../store/root-reducer";

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
      <ParticlesBg type="circle" bg={true} />

      <nav id="nav-wrap">
        <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
          Show navigation
        </a>
        <a className="mobile-btn" href="#home" title="Hide navigation">
          Hide navigation
        </a>

        <ul id="nav" className="nav">
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
          <h1 className="responsive-headline">{name}</h1>
          <h3>{description}.</h3>
          <hr />
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
