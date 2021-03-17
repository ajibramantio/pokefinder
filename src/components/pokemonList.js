import React from 'react';
import { useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import { Typography, Box, Grid, Button } from '@material-ui/core';
import PokemonDetail from './pokemonDetail';


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
  pokeBox: {
    width: '70%',
    padding: '20px 0',
    backgroundColor: '#262626',
    color: 'white',
    boxShadow: theme.shadows[5],
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  const state = useSelector(state => state);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(12);
  const [open, setOpen] = React.useState({
    state: false,
    data: {}
  });
  console.log(state.myPoke)

  const handleOpen = (param) => {
    setOpen({ state: true, data: param });
  };

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

  return (
    <Paper className={classes.root}>
      <Box className={classes.card}>
        {props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => {
          return (
            <Grid key={row.data.id} item xs={12} md={3}>
              <Box className={classes.pokeCard}>
                <Box borderRadius="borderRadius" className={classes.pokeBox}>
                  <Grid container>
                    <Grid item xs={12} md={12} className={classes.center}>
                      <Box onClick={() => handleOpen(row.data)} borderRadius={16} className={classes.boxImage}>
                        <img src={row.data.sprites.front_default} alt={row.data.name} width='70%' />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={12} className={classes.center}>
                      <Typography variant='body1' onClick={() => handleOpen(row.data)} style={{ fontSize: '20px', textTransform: 'capitalize' }}>{row.data.name}</Typography>
                    </Grid>
                    <Grid item xs={12} md={12} className={classes.center}>
                      <Box borderRadius="borderRadius" className={classes.boxType}>
                        <Typography variant='body1' style={{ fontSize: '20px', textTransform: 'capitalize' }}>{row.data.types[0].type.name}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={12} className={classes.center}>
                      <Button onClick={() => handleOpen(row.data)} variant="contained" className={classes.buttonDetails}>
                        See Details
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
        count={props.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <PokemonDetail open={open} handleClose={() => handleClose()}/>
    </Paper>
  );
}