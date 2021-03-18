import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import background from '../assets/grass.jpg';
import pokemon from '../assets/pokemon.png';
import pokeball from '../assets/pokeball.png';
import SearchIcon from '@material-ui/icons/Search';
import PokemonList from '../components/pokemonList';
import PokemonCatch from '../components/pokemonCatch';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Grid, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    minHeight: '100vh',
    textAlign: 'center',
    backgroundImage: `url(${background})`,
    // backgroundColor: '#156710',
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
  const [display, setDisplay] = useState(false);
  const [details, setDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);
  const [state, setState] = React.useState({
    filter: '',
    search: ''
  });

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000`)
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
  })

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
    handleFilter(event.target.value)
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
                                  value={state.search}
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
                          {/* <Button variant='body1' onClick={() => handleOpen()} style={{ borderRadius: 16 }}>My Pokemon</Button> */}
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
                  <PokemonCatch/>
                  :
                  details.length === 0 ?
                    <Box className={classes.box}>
                      <Grid item xs={12} md={12}>
                        <img src={pokemon} alt="wait" width='60%' height='40%' className={classes.waitPict}/>
                        <Typography variant='h6'>Wait a minute...</Typography>
                      </Grid>
                    </Box>
                    :
                    <PokemonList data={filteredDetails} />
                }
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Box>
    </Fragment>
  )
}

export default Mainpage;