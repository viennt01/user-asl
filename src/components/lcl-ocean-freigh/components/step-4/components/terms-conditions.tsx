import React from 'react';
import style from '../index.module.scss';
import { Image } from 'antd';

export default function TermsConditions() {
  return (
    <div className={style.termsConditions}>
      <div className={style.title}>Terms and conditions:</div>
      <div className={style.content}>
        <div>
          <Image
            src={'/images/oceanFreight/checkTitle.svg'}
            preview={false}
            width={15}
          />{' '}
          A customs declaration sheet (CDS) is limited up to 50 lines of goods
          only.
        </div>
        <div>
          <Image
            src={'/images/oceanFreight/checkTitle.svg'}
            preview={false}
            width={15}
          />{' '}
          Charges quoted are subject to storage charges (if any) and other
          charges which are issued invoice to directly customer by third
          parties.
        </div>
        <div>
          <Image
            src={'/images/oceanFreight/checkTitle.svg'}
            preview={false}
            width={15}
          />{' '}
          Local charges pay to carriers or coloaders at origin are subject on
          this quotation.
        </div>
        <div>
          <Image
            src={'/images/oceanFreight/checkTitle.svg'}
            preview={false}
            width={15}
          />{' '}
          Export taxes/duties if any are not included.
        </div>
        <div>
          <Image
            src={'/images/oceanFreight/checkTitle.svg'}
            preview={false}
            width={15}
          />{' '}
          Quotation is based on information provided at the time of the
          quotation request.{' '}
        </div>
        <div>
          <Image
            src={'/images/oceanFreight/checkTitle.svg'}
            preview={false}
            width={15}
          />{' '}
          Quotation for General Cargo only and is not valid for DG or oversized,
          overweight, odd length cargo
        </div>
      </div>
    </div>
  );
}
