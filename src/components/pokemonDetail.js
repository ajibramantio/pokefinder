import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { myPoke } from '../redux/actions/DataAction';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, TextField } from '@material-ui/core';


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
  },
  word: {
    width: '100%',
    marginTop: '1vh',
    fontWeight: 'bolder',
    [theme.breakpoints.down('sm')]: {
      fontSize: '5vw'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '2.5vw'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.5vw'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1vw'
    }
  },
  buttonDetails: {
    width: '50%',
    marginTop: '1vh',
    borderRadius: 16,
    backgroundColor: "#156710",
    color: 'black',
    fontWeight: 'bolder',
    fontSize: '0.6rem'
  }
}));

export default function PokemonDetail(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [show, setShow] = React.useState(false);
  const [nameCheck, setNameCheck] = React.useState(true);
  const dataLength = Object.keys(props.open.data).length;
  const [value, setValue] = React.useState({
    newName: '',
    listPokemon: [],
    listName: []
  });

  useEffect(() => {
    if (props.pokemon === "" || props.pokemon.length === 0) {
      setValue(prev => ({ ...prev, listPokemon: [], listName: [] }));
    } else {
      setValue(prev => ({ ...prev, listPokemon: props.pokemon, listName: props.names }));
    }
  }, []);

  const handleChange = name => e => {
    checkAvailable(e.target.value);
    setValue(prev => ({ ...prev, [name]: e.target.value }));
  };

  const handleSave = () => {
    setValue(prev => ({ ...prev, listPokemon: [ ...prev['listPokemon'].concat(props.open.data)], listName: [ ...prev['listName'].concat({ name: value.newName })] }));
    dispatch(myPoke(value.listPokemon, value.listName));
    setShow(false);
    setValue(prev => ({ ...prev, newName: '' }));
    props.handleClose();
  };

  const checkAvailable = (param) => {
    const list = value.listName;
    if (param === '') {
      setNameCheck(true);
    } else if (list.length === 0) {
      setNameCheck(false);
    } else {
      for (const [index, value] of list.entries()) {
        if (value.name.toLowerCase() === param.toLowerCase()) {
          setNameCheck(true);
        } else {
          setNameCheck(false);
        }
      }
    }
  }

  const randomizer = () => {
    var min = 1;
    var max = 3;
    var rand = Math.floor(min + (Math.random() * (max - min)));
    return rand;
  }

  const handleCatch = (param) => {
    var num = randomizer();
    if (num === 1) {
      setShow(true);
    } else {
      props.handleCloseRun();
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open.state}
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
            { show ?
              <div style={{ marginTop: '2vh' }}>
                <Typography className={classes.word}>Gotcha!, Pokemon was caught!</Typography>
                <TextField
                  id="standard-basic"
                  label="What would you call him?"
                  style={{ width: '100%', marginTop: '1vh' }}
                  variant="outlined"
                  value={value.newName}
                  onChange={handleChange('newName')}
                />
                <Button disabled={nameCheck} onClick={() => handleSave()} variant="contained" className={classes.buttonDetails}>
                  Go
                </Button>
              </div>
              :
              <div>
                <Button onClick={props.handleClose} variant="contained" className={classes.button} style={{ backgroundColor: "#F4483F" }} >
                  Close
                </Button>
                <Button onClick={() => handleCatch(props.open.data)} variant="contained" className={classes.button} style={{ backgroundColor: "#1e5c1d" }} >
                  Try Catch!
                </Button>
              </div>
            }
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
