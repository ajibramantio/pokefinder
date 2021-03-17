const myPokemon = {
  pokemon: [{ id: 1, pokemon: "apa1" }, { id: 2, pokemon: "apa2" }, { id: 3, pokemon: "apa3" }, { id: 4, pokemon: "apa4" }],
  names: [{ name: "ipi1" }, { name: "ipi2" }, { name: "ipi3" }, { name: "ipi4" }]
};

export const myPoke = (state = myPokemon, action) => {
  switch (action.type) {
    case 'POKE':
      return { ...state, pokemon: action.pokemon, names: action.names }
    default:
      return state
  }
}