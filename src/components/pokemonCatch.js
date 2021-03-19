import React, { useEffect } from 'react';
import buddy from '../assets/buddy.png';
import { useDispatch } from 'react-redux';
import { myPoke } from '../redux/actions/DataAction';
import { makeStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import { Typography, Box, Grid, Button, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '0 0 25px 25px',
    paddingTop: '30px',
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  card: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
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
  waitPict: {
    [theme.breakpoints.down('md')]: {
      width: '70%',
    },
    [theme.breakpoints.up('md')]: {
      width: '25%',
    },
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
  pokeBox: {
    width: '70%',
    padding: '20px 0',
    backgroundColor: '#262626',
    color: 'white',
    boxShadow: theme.shadows[5],
  },
  pokeCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px',
    backgroundColor: 'transparent'
  },
  boxImage: {
    marginBottom: '20px',
    padding: '10px 0',
    backgroundColor: '#808080',
  },
  boxType: {
    backgroundColor: '#808080',
    width: '45%'
  },
  buttonDetails: {
    borderRadius: 16,
    backgroundColor: "white",
    color: 'black',
    marginTop: '1.5em',
    width: '55%',
    fontWeight: 'bolder',
    fontSize: '0.6rem'
  }
}));

export default function PokemonCatch(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(12);
  const [value, setValue] = React.useState({
    pokemon: [],
    names: []
  });
  const [open, setOpen] = React.useState({
    state: false,
    data: {}
  });

  useEffect(() => {
    if (props.pokemon === "" || props.pokemon.length === 0) {
      setValue(prev => ({ ...prev, pokemon: [], names: [] }));
    } else {
      setValue(prev => ({ ...prev, pokemon: props.pokemon, names: props.names }));
    }
  });

  const handleClose = () => {
    setOpen({ state: false, data: {} });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRelease = (param) => {
    const newPokemon = props.pokemon;
    const newNames = props.names;
    const poke = newPokemon[param].name;
    const nama = newNames[param].name;
    newPokemon.splice(param, 1);
    newNames.splice(param, 1);
    dispatch(myPoke(newPokemon, newNames));
    setOpen({ state: true, data: { id: 1, initial: poke, name: nama } });
  };

  return (
    <Paper className={classes.root}>
      <Box className={classes.card}>
        {
          value.pokemon.length === 0 ?
            <Box className={classes.box}>
              <Grid item xs={12} md={12}>
                <img src={buddy} alt="wait" width='60%' height='40%' className={classes.waitPict} />
                <Typography variant='h6'>Let's go catch some pokemon!</Typography>
              </Grid>
            </Box>
            :
            value.pokemon.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => {
              return (
                <Grid key={row.id} item xs={12} md={3}>
                  <Box className={classes.pokeCard}>
                    <Box borderRadius="borderRadius" className={classes.pokeBox}>
                      <Grid container>
                        <Grid item xs={12} md={12} className={classes.center}>
                          <Box borderRadius={16} className={classes.boxImage}>
                            <img src={row.sprites.front_default} alt={row.name} width='70%' />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={12} className={classes.center}>
                          <Typography variant='body1' style={{ fontSize: '20px', textTransform: 'capitalize' }}>{value.names[idx].name}</Typography>
                        </Grid>
                        <Grid item xs={12} md={12} className={classes.center}>
                          <Box borderRadius="borderRadius" className={classes.boxType}>
                            <Typography variant='body1' style={{ fontSize: '20px', textTransform: 'capitalize' }}>{row.types[0].type.name}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={12} className={classes.center}>
                          <Button onClick={() => handleRelease(idx)} variant="contained" className={classes.buttonDetails}>
                            Release
                      </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
              )
            })}
      </Box>
      <TablePagination
        rowsPerPageOptions={[12, 20, 60, 100]}
        component="div"
        count={props.pokemon.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
