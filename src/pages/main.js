import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import background from '../assets/duo.jpg';
import pokemon from '../assets/pokemon.png';
import pokeball from '../assets/pokeball.png';
import SearchIcon from '@material-ui/icons/Search';
import PokemonList from '../components/pokemonList';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Grid, Select, FormControl, MenuItem, InputLabel, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    // backgroundImage: `url(${background})`,
    backgroundColor: '#156710',
    backgroundSize: "cover",
  },
  box: {
    borderRadius: '0 0 25px 25px',
    textAlign: 'center',
    width: '100%',
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
  }
}));

const Mainpage = () => {
  const classes = useStyles();
  const [details, setDetails] = useState([])
  const [filteredDetails, setFilteredDetails] = useState([])
  const [state, setState] = React.useState({
    filter: '',
    search: ''
  });

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=400`)
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
    setState({
      ...state,
      [name]: event.target.value,
    });
    handleFilter(event.target.value)
  };

  const handleFilter = (param) => {
    var filteredData = details.filter(function (pokemon) {
      if (param === "fire") {
        setState(prev => ({ ...prev, search: '' }))
        return pokemon.data.types[0].type.name === "fire";
      }
      else if (param === "water") {
        setState(prev => ({ ...prev, search: '' }))
        return pokemon.data.types[0].type.name === "water";
      }
      else if (param === "grass") {
        setState(prev => ({ ...prev, search: '' }))
        return pokemon.data.types[0].type.name === "grass";
      }
      else if (param === "rock") {
        setState(prev => ({ ...prev, search: '' }))
        return pokemon.data.types[0].type.name === "rock";
      }
      else if (param === "fighting") {
        setState(prev => ({ ...prev, search: '' }))
        return pokemon.data.types[0].type.name === "fighting";
      }
      else if (param === "poison") {
        setState(prev => ({ ...prev, search: '' }))
        return pokemon.data.types[0].type.name === "poison";
      }
      else if (param === "flying") {
        setState(prev => ({ ...prev, search: '' }))
        return pokemon.data.types[0].type.name === "flying";
      }
      else if (param === "bug") {
        setState(prev => ({ ...prev, search: '' }))
        return pokemon.data.types[0].type.name === "bug";
      }
      else if (param === "electric") {
        setState(prev => ({ ...prev, search: '' }))
        return pokemon.data.types[0].type.name === "electric";
      }
      else if (param === "ground") {
        setState(prev => ({ ...prev, search: '' }))
        return pokemon.data.types[0].type.name === "ground";
      }
      else if (param === "fairy") {
        setState(prev => ({ ...prev, search: '' }))
        return pokemon.data.types[0].type.name === "fairy";
      }
      else if (param === "psychic") {
        setState(prev => ({ ...prev, search: '' }))
        return pokemon.data.types[0].type.name === "psychic";
      }
      else if (param === "others") {
        setState(prev => ({ ...prev, search: '' }))
        return pokemon.data.types[0].type.name === "normal" || pokemon.data.types[0].type.name === "dark" || pokemon.data.types[0].type.name === "ghost" || pokemon.data.types[0].type.name === "steel" || pokemon.data.types[0].type.name === "ice" || pokemon.data.types[0].type.name === "dragon" || pokemon.data.types[0].type.name === "shadow" || pokemon.data.types[0].type.name === "unknown";
      }
      else if (param === '') {
        setState(prev => ({ ...prev, search: '' }))
        return pokemon;
      }
      else {
        return pokemon.data.name.includes(param)
      }
    });
    setFilteredDetails(filteredData)
  }

  return (
    <Fragment>
      <Box className={classes.container}>
        <div>
          <img src={pokeball} className="App-logo" alt="logo" style={{ paddingTop: '50px' }} />
          <Typography variant="h3" style={{ fontWeight: 'bolder', marginBottom: '0.5em' }}>
            Pokédex
          </Typography>
          <Grid container className={classes.boxPadding}>
            <Grid item xs={12} md={12}>
              <Box className={classes.filter}>
                <Grid container>
                  <Grid item xs={6} md={6} className={classes.left}>
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
                  <Grid item xs={6} md={6} className={classes.right}>
                    <Typography variant='body1' style={{ margin: '5px' }}>Filter by type: </Typography>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">All Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={state.filter}
                        onChange={handleChange('filter')}
                      >
                        <MenuItem value="">All Type</MenuItem>
                        <MenuItem value="fire">Fire</MenuItem>
                        <MenuItem value="water">Water</MenuItem>
                        <MenuItem value="grass">Grass</MenuItem>
                        <MenuItem value="rock">Rock</MenuItem>
                        <MenuItem value="fighting">Fighting</MenuItem>
                        <MenuItem value="poison">Poison</MenuItem>
                        <MenuItem value="flying">Flying</MenuItem>
                        <MenuItem value="bug">Bug</MenuItem>
                        <MenuItem value="electric">Electric</MenuItem>
                        <MenuItem value="ground">Ground</MenuItem>
                        <MenuItem value="fairy">Fairy</MenuItem>
                        <MenuItem value="psychic">Psychic</MenuItem>
                        <MenuItem value="others">Others</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container>
                {
                  details.length === 0 ?
                    <Box className={classes.box}>
                      <Grid item xs={12} md={12}>
                        <img src={pokemon} width='70%' height='40%' />
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