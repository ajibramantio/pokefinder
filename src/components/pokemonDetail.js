import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';


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
      width: '50%',
      padding: theme.spacing(2, 4, 3),
      fontSize: '5vw'
    },
    [theme.breakpoints.up('sm')]: {
      width: '30%',
      padding: theme.spacing(2, 4, 3),
      fontSize: '2.5vw'
    },
    [theme.breakpoints.up('md')]: {
    width: '20%',
    padding: theme.spacing(2, 4, 3),
    fontSize: '1.5vw'
    },
    [theme.breakpoints.up('lg')]: {
      width: '20%',
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
  }
}));

export default function PokeModal(props) {
  const classes = useStyles();
  const dataLength = Object.keys(props.open.data).length

  const randomizer = () => {
    var min = 1;
    var max = 3;
    var rand = Math.floor(min + (Math.random() * (max - min)));
    return rand;
  }

  const handleCatch = (param) => {
    var num = randomizer();
    console.log(num)
    if (num === 1) {
      console.log("Gotcha!, Pokemon was caught!")
      console.log(param)
      props.handleClose(1, param)
    } else {
      console.log("Oh no, he get away!")
      props.handleClose(2, param)
    }
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
          <div className={classes.paper}>
            <img src={dataLength === 0 ? null : props.open.data.sprites.front_default} style={{ width: "45%" }} alt="poke-img"></img>
            <h2 data-testid="pokeName" id="transition-modal-title" style={{ textTransform: 'capitalize' }}>{dataLength === 0 ? null : props.open.data.name}</h2>
            <div style={{ textAlign: 'left' }}>
              <p style={{ margin: "0" }} data-testid="height"><span style={{ fontWeight: 'bold' }}>height</span>: {dataLength === 0 ? null : props.open.data.height} </p>
              <p style={{ margin: "0" }} data-testid="base"><span style={{ fontWeight: 'bold' }}>base experience</span>: {dataLength === 0 ? null : props.open.data.base_experience} </p>
              <p style={{ margin: "0" }}><span style={{ fontWeight: 'bold' }}>type</span>:</p>
              {dataLength === 0 ? null :
                props.open.data.types.map((res, idx) => {
                  return (
                    <p key={idx} data-testid="type" style={{ margin: "0" }}> - {res.type.name}</p>
                  )
                })
              }
              <p style={{ margin: "0" }}><span style={{ fontWeight: 'bold' }}>abilities</span>:</p>
              {dataLength === 0 ? null :
                props.open.data.abilities.map((res, idx) => {
                  return (
                    <p key={idx} data-testid="ability" style={{ margin: "0" }}> - {res.ability.name}</p>
                  )
                })
              }
            </div>
            <Button onClick={props.handleClose} variant="contained" className={classes.button} style={{ backgroundColor: "#F4483F" }} >
              Close
            </Button>
            <Button onClick={() => handleCatch(props.open.data)} variant="contained" className={classes.button} style={{ backgroundColor: "#1e5c1d" }} >
              Try Catch!
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
