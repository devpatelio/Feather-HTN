import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory, Link } from 'react-router-dom';
import clsx from 'clsx';
import './auth.css';
import axiosInstance from '../../axiosInstance';
import qs from 'qs';

/* */
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop:'-5vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: '2vh',
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      marginTop:'4vh',
      left:'32%',
      background:'#F7921E',
      width:'8vw',
      fontFamily:'PlayfairDisplayBold',
      fontSize:'1vw',
      color:'#262626'
    },
    login:{
      color:'white',
      fontFamily:'PlayfairDisplayBold',
      fontSize:'3vw', 
    },
  }));
  
  export default function SignIn() {
    const classes = useStyles();
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let history = useHistory();

    const login = (event, email, password) => {
      event.preventDefault();
      axiosInstance
        .post('auth/token/', qs.stringify({ email: email, password: password }))
        .then(res => {
          localStorage.setItem('access', res.data.access)
          localStorage.setItem('refresh', res.data.refresh)
          history.push('/home');
        })
        .catch(err => {
          console.log(err.response);
        })
    }

    const onChangeHandler = (event) => {
        const { name, value } = event.currentTarget;
        if (name === 'email') {
          setEmail(value);
        } else if (name === 'password') {
          setPassword(value);
        }
      };

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            {/* // <img src={image} alt="feather"></img> */}
          <h1 className={classes.login}>Login</h1>
          <form className={classes.form} noValidate>
            <div className="field">
              <input
                id={1}
                type="email"
                value={email}
                placeholder="Email"
                name="email"
                onChange={(event) => onChangeHandler(event)}
              />
          </div>
            <div className="field" style={{marginTop:'3vh'}}>
              <input
                id={2}
                type="password"
                value={password}
                placeholder="Password"
                name="password"
                onChange={(event) => onChangeHandler(event)}
              />
          </div>
            <Button
              variant="contained"
              color="primary"
              className={clsx(classes.submit)}
              onClick={(event) => {
                login(event, email, password);
              }}
            >
              Sign In
            </Button>
            <Grid container style={{marginTop:'2vh'}} >
              <Grid item xs>
                <Link href="#" variant="body2" style={{color: '#cdcdcd'}}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2" style={{color: '#cdcdcd', marginright: '30px'}}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
        </Box>
      </Container>
    );
  }