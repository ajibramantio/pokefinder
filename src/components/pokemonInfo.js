import React from 'react';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import release from '../assets/release.png';
import catched from '../assets/catched.png';
import runaway from '../assets/runaway.jpg';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    textAlign: 'center',
    backgroundColor: 'white',
    border: '1px solid #4f9d4d',
    borderRadius: 16,
    boxShadow: theme.shadows[5],
    [theme.breakpoints.down('sm')]: {
      width: '60%',
      padding: theme.spacing(2, 4, 3),
      fontSize: '5vw'
    },
    [theme.breakpoints.up('sm')]: {
      width: '50%',
      padding: theme.spacing(2, 4, 3),
      fontSize: '2.5vw'
    },
    [theme.breakpoints.up('md')]: {
      width: '40%',
      padding: theme.spacing(2, 4, 3),
      fontSize: '1.5vw'
    },
    [theme.breakpoints.up('lg')]: {
      width: '30%',
      padding: theme.spacing(2, 4, 3),
      fontSize: '1vw'
    }
  },
  button: {
    borderRadius: 16,
    color: 'black',
    margin: '1.5em 0.5em 0 0.5em',
    fontWeight: 'bolder',
    [theme.breakpoints.down('md')]: {
      fontSize: '0.7rem'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '0.8rem'
    },
  },
  picture: {
    borderRadius: 25,
    shadows: 2,
    [theme.breakpoints.down('md')]: {
      width: '70%',
    },
    [theme.breakpoints.up('md')]: {
      width: '80%',
    },
  },
}));

export default function PokeInfo(props) {
  const classes = useStyles();
  console.log(props);
  const id = props.open.data.id;
  const initial = props.open.data.initial;
  const name = props.open.data.name;
  const [state, setState] = React.useState({
    newName: ''
  });
  
  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open.state}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open.state}>
          {id === 1 ?
            <div className={classes.paper}>
              <img src={release} alt="release" width='60%' height='40%' className={classes.picture} />
              <Typography style={{ fontWeight: 'bolder' }}>Your {initial}({name}) were released! Bye-bye!</Typography>
            </div>
            :
            id === 2 ?
              <div className={classes.paper}>
                <img src={catched} alt="catched" width='60%' height='40%' className={classes.picture} />
                <Typography>Gotcha!, Pokemon was caught!</Typography>
                <TextField
                  id="standard-basic"
                  label="What would you call him?"
                  variant="outlined"
                  value={state.newName}
                  onChange={handleChange('newName')}
                />
              </div>
              :
              <div className={classes.paper}>
                <img src={runaway} alt="runaway" width='60%' height='40%' className={classes.picture} />
                <Typography>Oh no, he got away!</Typography>
              </div>
          }
        </Fade>
      </Modal>
    </div>
  );
}
