import React from 'react';
import style from './index.module.scss';
import { SUPPORT_EMAIL } from '@/constants/common';

const ContactSection = () => {
  const mailSupport = 'merchantInfo?.config?.support?.email' ?? SUPPORT_EMAIL;

  return (
    <section id="contact" className={style.section}>
      <div className="container">
        <p className={style.title}>Contact us</p>
        <p className={style.desc}>
          Get in touch and let’s make something great together. Let’s turn your
          idea on an even greater product.
        </p>
        <a
          className={style.email}
          href={`mailto:${mailSupport}`}
          title={`Mail to ${mailSupport}`}
        >
          {mailSupport}
        </a>
        <a
          className={style.message}
          href={`mailto:${mailSupport}`}
          title={`Mail to ${mailSupport}`}
        >
          Feel free to send us a message
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
