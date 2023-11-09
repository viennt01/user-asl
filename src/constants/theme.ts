import { theme } from 'antd';
import COLORS from './color';

export const THEME_APP = {
  token: {
    // fontFamily: kanit.style.fontFamily, // it only effects to antd tags
    colorPrimary: COLORS.GREY_COLOR_HOVER,
    colorPrimaryBg: COLORS.BRIGHT,
    borderRadius: 8,
  },
};

export const THEME_FORM = {
  algorithm: theme.darkAlgorithm,
  token: {
    screenLGMax: 1169,
    screenXL: 1170,
    screenXLMin: 1170,
    borderRadius: 2,
    fontSize: 16,
    colorBorder: 'transparent',
    colorPrimaryBg: COLORS.PRIMARY,
    colorBgContainer: COLORS.MIRAGE,
    colorBgElevated: COLORS.MIRAGE,
    colorBgContainerDisabled: COLORS.MIRAGE,
    colorTextPlaceholder: COLORS.RIVER_BED,
  },
};

export const THEME_TABLE = {
  algorithm: theme.darkAlgorithm,
  token: {
    borderRadius: 0,
    colorTextHeading: COLORS.BLUE_BELL,
    colorBgContainer: COLORS.BG_SECONDARY,
    colorBorderSecondary: COLORS.BLACK,
  },
};
