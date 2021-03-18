const myPokemon = {
  pokemon: [],
  names: []
};

export const myPoke = (state = myPokemon, action) => {
  switch (action.type) {
    case 'POKE':
      return { ...state, pokemon: action.pokemon, names: action.names }
    default:
      return state
  }
}