import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import { usePokedexStore } from './store/pokedex';

function App() {
  const pokemonList = usePokedexStore((state) => state.pokemonList, shallow);
  const updatePokemonList = usePokedexStore((state) => state.updatePokemonList);
  const updateActivePokemonName = usePokedexStore(
    (state) => state.updateActivePokemonName
  );
  const pokemon = usePokedexStore((state) => state.pokemon, shallow);
  const reset = usePokedexStore((state) => state.reset);

  useEffect(() => {
    updatePokemonList();
  }, []);

  return (
    <div className="App">
      <h1>pokedex</h1>
      <button onClick={reset}>reset</button>
      <button onClick={updatePokemonList}>refetch</button>
      {pokemon?.name && (
        <div>
          <h2>
            {pokemon?.name} - {pokemon?.nameJA}
          </h2>
          <img
            width="400px"
            height="400px"
            src={pokemon?.image}
            alt={pokemon?.name}
          />
        </div>
      )}
      <ul style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none' }}>
        {pokemonList.map((name) => (
          <li style={{ margin: '0 8px 6px 0' }} key={name}>
            <button onClick={() => updateActivePokemonName(name)}>
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
