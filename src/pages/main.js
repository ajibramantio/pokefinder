import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import pokemon from '../assets/pokemon.png';
import background from '../assets/grass.jpg';
import pokeball from '../assets/pokeball.png';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import PokemonList from '../components/pokemonList';
import { myPoke } from '../redux/actions/DataAction';
import PokemonCatch from '../components/pokemonCatch';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Box, Grid, TextField, Snackbar, IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    minHeight: '100vh',
    textAlign: 'center',
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: 'center',
    backgroundSize: "cover",
  },
  box: {
    borderRadius: '0 0 25px 25px',
    textAlign: 'center',
    width: '100%',
    height: 'auto',
    padding: '60px 0',
    marginTop: '5px',
    backgroundColor: '#FFFFFF',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '20vw'
  },
  filter: {
    backgroundColor: 'white',
    borderRadius: '25px 25px 0 0',
    padding: '20px',
  },
  formControl: {
    minWidth: 120,
  },
  boxPadding: {
    [theme.breakpoints.down('md')]: {
      padding: '0 20px 20px 20px',
    },
    [theme.breakpoints.up('lg')]: {
      padding: '0 80px 80px 80px',
    },
  },
  waitPict: {
    [theme.breakpoints.down('md')]: {
      width: '70%',
    },
    [theme.breakpoints.up('md')]: {
      width: '30%',
    },
  },
  textButton: {
    padding: '0.3vw 1vw',
    borderColor: '#c90000',
    boxShadow: 'none',
    '&:hover': {
      color: '#ffffff',
      backgroundColor: '#c90000',
      borderColor: '#c90000',
      boxShadow: 'none',
    },
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '0.3vw 1vw',
    borderColor: '#c90000',
    boxShadow: 'none',
    '&:hover': {
      color: '#c90000',
      backgroundColor: '#000000',
      borderColor: '#c90000',
      boxShadow: 'none',
    },
    cursor: 'pointer',
  }
}));

const Mainpage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const [success, setSuccess] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [display, setDisplay] = useState(false);
  const [details, setDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);
  const [values, setValues] = React.useState({
    filter: '',
    search: ''
  });

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100`)
      .then(res => {
        const details = res.data.results
        const urlDetails = Array.from(details, x => x.url)
        Promise.all(urlDetails.map(u => axios.get(u))).then(responses => {
          setDetails(responses)
          if (filteredDetails.length === 0) {
            setFilteredDetails(responses)
          }
        })
      })
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSuccess = () => {
    setSuccess(true);
  };

  const handleShut = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccess(false);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
    handleFilter(event.target.value)
  };

  const setData = (poke, name) => {
    dispatch(myPoke(poke, name));
    localStorage.setItem('pokemon', poke);
    localStorage.setItem('names', name);
  };

  const handleDisplay = () => {
    setDisplay(!display);
  };

  const handleFilter = (param) => {
    var text = param.toLowerCase()
    var filteredData = details.filter(function (pokemon) { return pokemon.data.name.includes(text) });
    setFilteredDetails(filteredData)
  }

  return (
    <Fragment>
      <Box className={classes.container}>
        <div>
          <img src={pokeball} className="App-logo" alt="logo" style={{ paddingTop: '50px' }} />
          <Typography variant="h4" style={{ marginBottom: '0.5em' }}>
            Pokéfinder
          </Typography>
          <Grid container className={classes.boxPadding}>
            <Grid item xs={12} md={12}>
              <Box className={classes.filter}>
                {
                  display ?
                    <div>
                      <Grid container>
                        <Grid item xs={12} md={12} className={classes.left}>
                          <Box border={1} borderRadius={25} className={classes.textButton} onClick={() => handleDisplay()}>
                            <Typography variant="h6" style={{ fontWeight: 'bolder' }}>Back</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </div>
                    :
                    <div>
                      <Grid container>
                        <Grid item xs={8} md={6} className={classes.left}>
                          <div className={classes.margin}>
                            <Grid container spacing={1} alignItems="flex-end">
                              <Grid item>
                                <SearchIcon />
                              </Grid>
                              <Grid item>
                                <TextField
                                  id="input-with-icon-grid"
                                  label="Search by name..."
                                  inputProps={{ 'aria-label': 'search' }}
                                  value={values.search}
                                  onChange={handleChange('search')}
                                />
                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                        <Grid item xs={4} md={6} className={classes.right}>
                          <Box border={1} borderRadius={25} className={classes.textButton} onClick={() => handleDisplay()}>
                            <Typography variant="h6" style={{ fontWeight: 'bolder' }}>My Pokemon</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </div>
                }
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container>
                {
                  display ?
                    <PokemonCatch setData={() => setData()} pokemon={state.myPoke.pokemon} names={state.myPoke.names} />
                    :
                    details.length === 0 ?
                      <Box className={classes.box}>
                        <Grid item xs={12} md={12}>
                          <img src={pokemon} alt="wait" width='60%' height='40%' className={classes.waitPict} />
                          <Typography variant='h6'>Wait a minute...</Typography>
                        </Grid>
                      </Box>
                      :
                      <PokemonList data={filteredDetails} setData={() => setData()} pokemon={state.myPoke.pokemon} names={state.myPoke.names} handleOpen={() => handleOpen()} handleSuccess={() => handleSuccess()} />
          }
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Oh no, he get away!"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={success}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Yeay, we've got him!"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleShut}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Fragment>
  )
}

export default Mainpage;