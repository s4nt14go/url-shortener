import React, { useState, useEffect } from "react";
import {
  fade,
  withStyles,
  makeStyles,
} from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import logo from './images/profile.jpeg';
import twitter from './images/twitter.svg';
import heart from './images/heart-emoji.png';
import backgroundImage from './images/background.jpg';
import Container from "@material-ui/core/Container";
import InputBase from '@material-ui/core/InputBase';
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import AlertDialog from "./AlertDialog";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Link from '@material-ui/core/Link';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

const useStyles = makeStyles(() => ({
  backgroundImage: {
    'backgroundImage': `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  send: {
    width: 'fit-content',
    height: '41px',
    borderRadius: '0 4px 4px 0',
    backgroundColor: '#f6435d', // hsl(351, 91%, 61%);
    color: 'white',
    '&:hover': {
      backgroundColor: '#c80926'  //"#c80926" hsl(351, 91%, 41%);
    }
  },
  pasteIn: {
    verticalAlign: 'middle',
    '& > *': {
      borderRadius: '4px 0 0 4px',
      minWidth: '344px'
    },
  },
  pasteForm: {
    paddingTop: '50px',
  },
  shortUrl: {
    margin: 'auto',
    marginTop: '20px',
    marginBottom: '150px',
    padding: 7,
    backgroundColor: 'white',
    borderRadius: 4,
    color: '#605c5c',
  },
  top5: {
    margin: '40px',
    color: '#605c5c'
  },
  list: {
    paddingBottom: 50
  },
  listItem: {
    borderBottom: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: '#fff0f2',
    paddingBottom: 0,
    paddingTop: 15,
    color: '#605c5c'
  },
  flex: {
    flexGrow: 1
  },
  footer: {
    bottom: 0,
    position: 'fixed',
    width: '100%',
    backgroundColor: '#fafafa'
  },
  footerImg: {
    width: '18px',
  },
  footerP: {
    display: 'inline',
    verticalAlign: 'super',
    padding: '5px',
    fontSize: 'larger',
    color: '#605c5c',
  },
  disabled: {
    color: 'white !important',
    backgroundColor: 'gray !important',
    '&:hover': {
      color: 'white !important',
      backgroundColor: 'gray !important',
    }
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function App() {
  const classes = useStyles();

  const [url, setUrl] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [shortUrl, setShortUrl] = useState('');
  const [top5, setTop5] = useState([]);
  const [shrinking, setShrinking] = useState(false);


  useEffect(() => {
    const getInitialTop5 = async () => {
      console.log('getInitialTop5');

      try {
        const response = await axios.get('/api/shrink');
        const top5 = response.data.top5;
        console.log(top5);
        setTop5(top5);
      } catch (error) {
        console.log(error);
      }
    };

    getInitialTop5().catch(console.log);
  }, []);


  function handleCloseAlert(){
    setOpenAlert(false);
  }

  function shrink() {

    setShrinking(true);
    const post = async () => {
      try {
        const result = await axios.post('/api/shrink',
          {url});
        console.log(result);

        if (result.data.success) {
          setUrl('');
          setOpenSnackbar(true);
          console.log('result.data', result.data);
          setShortUrl(result.data.shortened.short);
          setTop5(result.data.top5);
        } else {
          error(result.data)
        }

      } catch (e) {
        error(e);
      }
      setShrinking(false);
    };

    function error(e){
      setErrorMessage(e);
      setOpenAlert(true);
    }

    post();
  }

  function handleChange(e){
    setUrl(e.target.value);
    setShortUrl('');
  }

  return (<>

      <div className={classes.backgroundImage}>
        <AppBar position="static" className={classes.backgroundImage} elevation={0}>
          <Toolbar>
            <Avatar alt="Remy Sharp" src={logo} style={{ marginTop: '27px', width: 60,
              height: 60 }} />
          </Toolbar>

          <Typography style={{margin: 'auto'}} variant="h4">
            Shrink your link!
          </Typography>

          <Typography style={{margin: 'auto'}} variant="subtitle1">
            A long URL is always a problem. It's hard to remember and share.
          </Typography>

          <FormControl className={`${classes.pasteForm}`}>
            <div style={{margin: 'auto'}}>
              <BootstrapInput id="bootstrap-input" className={classes.pasteIn} placeholder='Paste the link to shrink it'
                              value={url}
                              onChange={handleChange}/>
              {shrinking?
                <Button variant="contained" disabled onClick={shrink}  className={`${classes.send} ${classes.disabled}`}>
                  SHRINKING
                </Button>
                : <Button variant="contained" onClick={shrink} className={`${classes.send}`} style={{minWidth: 103}}>
                  SHRINK
                </Button>
              }
            </div>
          </FormControl>

          {shortUrl?
            <Typography className={classes.shortUrl} variant="subtitle1">
              Short url:&nbsp;
              <Link href={shortUrl} target="_blank" rel="noreferrer">{/*onClick={preventDefault}*/}
                {shortUrl}
                <OpenInNewIcon style={{verticalAlign: 'top'}} />
              </Link>
            </Typography>
            :
            <Typography className={classes.shortUrl} style={{backgroundColor: 'transparent'}} variant="subtitle1">
              &nbsp;
            </Typography>
          }

        </AppBar>
      </div>


      <Typography variant="h5" className={classes.top5} align='center'>
        Top 5
      </Typography>

      <Container maxWidth="sm">
        <List dense={true} className={classes.list}>
          {top5.map(link => {
            return (
              <ListItem className={classes.listItem} key={link._id}>
                <ListItemText primary={link.short}/>
                {link.count}
              </ListItem>
            )
          })}
        </List>
      </Container>

      <div className={classes.footer}>
        <Toolbar variant="dense">
          <Typography
            variant="caption"
            color="inherit"
            className={classes.flex}>
            <p className={classes.footerP}>Made with</p>
            <img src={heart} alt='' className={classes.footerImg} />
            <p className={classes.footerP}>by Interlink</p>
          </Typography>
          <Link href='https://twitter.com/g0s4n' target="_blank" rel="noreferrer">
            <img src={twitter} alt='' className={classes.footerImg} />
          </Link>
        </Toolbar>
      </div>

      <AlertDialog open={openAlert} handleClose={handleCloseAlert} error={errorMessage}/>

      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        key={`top,center`}
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        >
        <Alert severity="success">
          Success!
        </Alert>
      </Snackbar>
    </>
  );
}