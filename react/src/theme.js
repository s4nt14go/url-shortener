import { createMuiTheme } from '@material-ui/core/styles';
import SFProDisplayWoff2 from './fonts/SFProDisplay-Regular.woff2';

const sfprodisplay = {
  fontFamily: 'SFProDisplay',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('SFProDisplay'),
    local('SFProDisplay-Regular'),
    url(${SFProDisplayWoff2}) format('woff2')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

// A custom theme for this app
const theme = createMuiTheme({
  typography: {
    fontFamily: 'SFProDisplay',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [sfprodisplay],
      },
    },
  },
});

console.log(theme);

export default theme;
