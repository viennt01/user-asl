/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config');

const appEnv = process.env.APP_ENV || 'dev';
const version = process.env.VERSION || '0.1.0';

const API_MAIN_GW = {
  dev: 'http://192.168.1.41:5191',
  staging: 'http://192.168.1.41:5191',
  production: 'http://192.168.1.41:5191',
};

const env = {
  VERSION: version,
  APP_ENV: appEnv,
  API_MAIN_GW: API_MAIN_GW[appEnv],
};

const nextConfig = {
  reactStrictMode: false,
  i18n,
  env,
  experimental: {
    appDir: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [{ name: 'removeViewBox', active: false }],
            },
          },
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
