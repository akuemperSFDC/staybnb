import { AiFillGithub } from 'react-icons/ai';
import { TiSocialLinkedinCircular } from 'react-icons/ti';
import { SiAngellist } from 'react-icons/si';
// import { CgWebsite } from 'react-icons/cg';
import './Footer.css';

const Footer = () => {
  return (
    <div className={`footer__container`}>
      <div className='footer__link-container-all'>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://github.com/AKuemper'
          className='footer__link-container'
        >
          <AiFillGithub className='footer__link-icon' />
          <div className='footer__links footer__linkedin-link'>GitHub</div>
        </a>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://www.linkedin.com/in/austin-kuemper-0b471b84/'
          className='footer__link-container'
        >
          <TiSocialLinkedinCircular className='footer__link-icon' />
          <div className='footer__links footer__linkedin-link'>LinkedIn</div>
        </a>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://angel.co/u/austin-kuemper'
          className='footer__link-container'
        >
          <SiAngellist className='footer__link-icon' />
          <div className='footer__links footer__angellist-link'>AngelList</div>
        </a>
        {/* <a
          target='_blank'
          rel='noopener noreferrer'
          href='/'
          className='footer__link-container'
        >
          <CgWebsite className='footer__link-icon' />
          <div className='footer__links footer__portfolio-link'>Portfolio</div>
        </a> */}
      </div>
      {/* <div className='opacity-faker'></div> */}
    </div>
  );
};

export default Footer;
