const head = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

export function myPoke(pokemon, names) {
  return {
    type: 'POKE',
    pokemon: pokemon,
    names: names,
  }
}