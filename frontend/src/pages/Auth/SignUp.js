import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
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
    signup:{
      color:'white',
      fontFamily:'PlayfairDisplayBold',
      fontSize:'3vw', 
    },
  }));
  
  export default function SignUp() {
    const classes = useStyles();
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");

    let history = useHistory();

    const signup = (event, firstName, lastName, email, password, username) => {
        event.preventDefault();
        axiosInstance
          .post('user/signup/', qs.stringify({
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            username: username,
          }))
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
        if (name === 'firstName') {
          setFirstName(value);
        } else if (name === 'lastName') {
          setLastName(value);
        } else if (name === 'email') {
          setEmail(value);
        } else if (name === 'password') {
          setPassword(value);
        } else if (name === 'username') {
          setUsername(value);
        }
      };

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper} style={{marginTop:'3vh'}}>
            {/* // <img src={image} alt="feather"></img> */}
          <h1 className={classes.signup}>Sign Up</h1>
          <form className={classes.form} noValidate>
          <div className="field">
            <input
              id={1}
              type="text"
              value={firstName}
              placeholder="First Name"
              name="firstName"
              onChange={(event) => onChangeHandler(event)}
            />
          </div>
          <div className="field" style={{marginTop:'3vh'}}> 
            <input
              id={1}
              type="text"
              value={lastName}
              placeholder="Last Name"
              name="lastName"
              onChange={(event) => onChangeHandler(event)}
            />
          </div>
          <div className="field" style={{marginTop:'3vh'}}>
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
              id={1}
              type="username"
              value={username}
              placeholder="Username"
              name="username"
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
                signup(event, firstName, lastName, email, password, username);
              }}
            >
              Sign up!
            </Button>
            <Grid container style={{marginTop:'2vh'}}>
              <Grid item xs>
                <Link href="#" variant="body2" style={{color: '#cdcdcd'}}>
                  Forgot password?
                </Link>
              </Grid>
              <div className="alreadysignedup">
              <Grid item >
                <Link to="/" variant="body2" style={{color: '#cdcdcd'}}>
                  {"Already signed up? Log in."}
                </Link>
              </Grid>
              </div>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
        </Box>
      </Container>
    );
  }