import React from 'react';
import './Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <h2 className="footer__header">Contact</h2>
      <div className="footer__content">
            <div className="footer__textblock">
              <div className="footer__label">Phone</div>
              <div className="footer__phone">+49 999 999 99 99</div>
            </div>
            <div className="footer__socials">
              <div className="footer__label">Socials</div>
              <div className="footer__icons">
                <a
                  href="https://www.facebook.com/deinprofil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__icon-link"
                >
                  <FontAwesomeIcon icon={faFacebook} className="footer__icon" />
                </a>
                <a
                  href="https://www.instagram.com/deinprofil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__icon-link"
                >
                  <FontAwesomeIcon icon={faInstagram} className="footer__icon" />
                </a>
              </div>
            </div>

            <div className="footer__address">
              <div className="footer__label">Address</div>
              <div className="footer__info">
                Linkstraße 2, 8 OG,<br />
                10 785, Berlin, Deutschland
              </div>
            </div>
            <div className="footer__hours">
              <div className="footer__label">Working Hours</div>
              <div className="footer__info">24 hours a day</div>
            </div>
      </div>

      <div className="footer__map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.407803218047!2d13.372505776680402!3d52.507958572058044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851cbdeaf3909%3A0xf7ba771ff4a1e901!2sLinkstra%C3%9Fe%202%2F8%20OG%2C%2010785%20Berlin!5e0!3m2!1sde!2sde!4v1751373428510!5m2!1sde!2sde"
        
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps Location"
        ></iframe>
      </div>
    </footer>
  );
};

export default Footer;
