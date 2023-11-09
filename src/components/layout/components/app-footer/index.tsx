import { Layout, Image } from 'antd';
import React from 'react';
import style from './index.module.scss';

import SvgFacebook from './assets/facebook.svg';
import SvgTelegram from './assets/telegram.svg';
import SvgYoutube from './assets/youtube.svg';
import SvgTwitter from './assets/twitter.svg';
import SvgDiscord from './assets/discord.svg';
import Link from 'next/link';

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer className={style.appFooterWrapper}>
      <div className={style.appFooter}>
        <div className="container">
          <div className={style.container}>
            <div className={style.about}>
              <Image src={'/svg/logo-dark.svg'} alt="logo" preview={false} />
            </div>
            <p className={style.aboutText}>
              The revolutionary platform that brings the power of algorithmic
              trading to your fingertips. Experience the next generation of
              trading with our user-friendly interface, designed for traders of
              all levels.
            </p>
          </div>
        </div>
      </div>

      {/*  COPYRIGHT */}
      <div className={style.moreInfo}>
        <div className={`container ${style.container}`}>
          <div className={style.copyright}>
            {'merchantInfo?.config?.copyright' ?? ''}
          </div>
          <div className={style.socialMedia}>
            {'merchantInfo?.config?.social_media?.facebook_url' && (
              <Link
                href={'merchantInfo?.config?.social_media?.facebook_url' ?? ''}
                target="_blank"
                rel="nofollow"
              >
                <SvgFacebook />
              </Link>
            )}
            {'merchantInfo?.config?.social_media?.telegram_url' && (
              <Link
                href={'merchantInfo?.config?.social_media?.telegram_url' ?? ''}
                target="_blank"
                rel="nofollow"
              >
                <SvgTelegram />
              </Link>
            )}
            {'merchantInfo?.config?.social_media?.youtube_url' && (
              <Link
                href={'merchantInfo?.config?.social_media?.youtube_url' ?? ''}
                target="_blank"
                rel="nofollow"
              >
                <SvgYoutube />
              </Link>
            )}
            {'merchantInfo?.config?.social_media?.discord_url' && (
              <Link
                href={'merchantInfo?.config?.social_media?.discord_url' ?? ''}
                target="_blank"
                rel="nofollow"
              >
                <SvgDiscord />
              </Link>
            )}
            {'merchantInfo?.config?.social_media?.twitter_url' && (
              <Link
                href={'merchantInfo?.config?.social_media?.twitter_url' ?? ''}
                target="_blank"
                rel="nofollow"
              >
                <SvgTwitter />
              </Link>
            )}
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default AppFooter;
