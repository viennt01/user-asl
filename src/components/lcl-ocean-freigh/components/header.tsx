import React, { useEffect, useState } from 'react';
import style from '../index.module.scss';
import { Flex, Image } from 'antd';
import COLORS from '@/constants/color';

interface Props {
  displayStep: number;
}

export default function HeaderFclOceanFreight({ displayStep }: Props) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // Xác định điều kiện để hiển thị hoặc ẩn các bước
  const shouldDisplayStep = (step: number) => {
    if (windowWidth < 600) {
      return displayStep === step;
    } else {
      return true; // Hiển thị tất cả bước khi windowWidth > 576
    }
  };

  return (
    <div className={style.header}>
      <Flex
        className={style.contentHeader}
        justify={'space-between'}
        align={'center'}
      >
        <Flex
          className={style.step}
          style={{
            background: displayStep === 1 ? COLORS.WHITE : '',
            display: shouldDisplayStep(1) ? '' : 'none',
          }}
          justify={'center'}
          align={'center'}
        >
          <Flex
            className={style.no}
            justify={'center'}
            align={'center'}
            style={{
              display: displayStep > 1 ? 'none' : '',
              background: displayStep >= 1 ? COLORS.GREY_COLOR_HOVER : '',
            }}
          >
            1
          </Flex>
          <Image
            src={'/images/oceanFreight/check.svg'}
            preview={false}
            width={displayStep > 1 ? 30 : 0}
            style={{ display: displayStep >= 1 ? '' : 'none' }}
          />
          <Flex
            className={style.contentStep}
            justify={'center'}
            align={'center'}
            style={{ color: displayStep >= 1 ? COLORS.GREY_COLOR_HOVER : '' }}
          >
            Check price
          </Flex>
        </Flex>
        <Flex
          className={style.step}
          style={{
            background:
              displayStep === 2.1 || displayStep === 2.2 ? COLORS.WHITE : '',
            display: shouldDisplayStep(displayStep === 2.1 ? 2.1 : 2.2)
              ? ''
              : 'none',
          }}
          justify={'center'}
          align={'center'}
        >
          <Flex
            className={style.no}
            justify={'center'}
            align={'center'}
            style={{
              display: displayStep < 3 ? '' : 'none',
              background:
                displayStep === 2.1 || displayStep === 2.2
                  ? COLORS.GREY_COLOR_HOVER
                  : '',
            }}
          >
            2
          </Flex>
          <Image
            src={'/images/oceanFreight/check.svg'}
            preview={false}
            width={displayStep > 2.2 ? 30 : 0}
            style={{ display: displayStep > 2.2 ? '' : 'none' }}
          />
          <Flex
            className={style.contentStep}
            justify={'center'}
            align={'center'}
            style={{ color: displayStep >= 2 ? COLORS.GREY_COLOR_HOVER : '' }}
          >
            Booking
          </Flex>
        </Flex>
        <Flex
          className={style.step}
          justify={'center'}
          align={'center'}
          style={{
            background: displayStep === 3 ? COLORS.WHITE : '',
            display: shouldDisplayStep(3) ? '' : 'none',
          }}
        >
          <Flex
            className={style.no}
            justify={'center'}
            align={'center'}
            style={{
              display: displayStep < 4 ? '' : 'none',
              background: displayStep === 3 ? COLORS.GREY_COLOR_HOVER : '',
            }}
          >
            3
          </Flex>
          <Image
            src={'/images/oceanFreight/check.svg'}
            preview={false}
            width={displayStep > 3 ? 30 : 0}
            style={{ display: displayStep > 3 ? '' : 'none' }}
          />
          <Flex
            className={style.contentStep}
            justify={'center'}
            align={'center'}
            style={{
              width: '150px',
              color: displayStep >= 3 ? COLORS.GREY_COLOR_HOVER : '',
            }}
          >
            Recommend Service
          </Flex>
        </Flex>
        <Flex
          className={style.step}
          justify={'center'}
          align={'center'}
          style={{
            background: displayStep === 4 ? COLORS.WHITE : '',
            display: shouldDisplayStep(4) ? '' : 'none',
          }}
        >
          <Flex
            className={style.no}
            justify={'center'}
            align={'center'}
            style={{
              display: displayStep < 5 ? '' : 'none',
              background: displayStep === 4 ? COLORS.GREY_COLOR_HOVER : '',
            }}
          >
            4
          </Flex>
          <Image
            src={'/images/oceanFreight/check.svg'}
            preview={false}
            width={displayStep > 4 ? 30 : 0}
            style={{ display: displayStep > 4 ? '' : 'none' }}
          />
          <Flex
            className={style.contentStep}
            justify={'center'}
            align={'center'}
            style={{
              width: '120px',
              color: displayStep >= 4 ? COLORS.GREY_COLOR_HOVER : '',
            }}
          >
            Review Booking
          </Flex>
        </Flex>
        <Flex
          className={style.step}
          justify={'center'}
          align={'center'}
          style={{
            background: displayStep === 5 ? COLORS.WHITE : '',
            display: shouldDisplayStep(5) ? '' : 'none',
          }}
        >
          <Flex
            className={style.no}
            justify={'center'}
            align={'center'}
            style={{
              display: displayStep < 6 ? '' : 'none',
              background: displayStep === 5 ? COLORS.GREY_COLOR_HOVER : '',
            }}
          >
            5
          </Flex>
          <Image
            src={'/images/oceanFreight/check.svg'}
            preview={false}
            width={displayStep > 5 ? 30 : 0}
            style={{ display: displayStep > 5 ? '' : 'none' }}
          />
          <Flex
            className={style.contentStep}
            justify={'center'}
            align={'center'}
            style={{
              color: displayStep >= 5 ? COLORS.GREY_COLOR_HOVER : '',
            }}
          >
            Finish
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}
