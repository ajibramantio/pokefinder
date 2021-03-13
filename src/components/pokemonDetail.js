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
    width: '30%',
    textAlign: 'center',
    backgroundColor: '#156710',
    border: '1px solid #5ccf64',
    borderRadius: 8,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function PokeModal(props) {
  const classes = useStyles();
  const dataLength = Object.keys(props.open.data).length

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
            <img src={dataLength === 0 ? null : props.open.data.sprites.front_default} alt="poke-img"></img>
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
            <Button onClick={props.handleClose}>Done</Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
