import { create } from 'zustand';
import { persist, devtools, subscribeWithSelector } from 'zustand/middleware';
import { pokeApi } from '../api/pokeApi';

const initialStore = {
  activePokemonName: null,
  pokemonList: [],
  pokemon: {
    id: null,
    experience: null,
    height: null,
    weight: null,
    stats: [],
    image: null,
    name: null,
  },
};

export const usePokedexStore = create(
  subscribeWithSelector(
    devtools(
      persist(
        (set) => ({
          ...initialStore,
          updatePokemonList: async () => {
            const pokemonList = await pokeApi.getPokemonList();
            if (Array.isArray(pokemonList)) {
              set(() => ({ pokemonList }), false, 'updatePokemonList');
            }
          },
          updateActivePokemonName: (name) => {
            set(
              () => ({ activePokemonName: name }),
              false,
              'updateActivePokemonName'
            );
          },
          updatePokemon: async (name) => {
            console.log('updatePokemon', name);
            const [mainData, secondaryData] = await Promise.all([
              pokeApi.getPokemonByName(name),
              pokeApi.getPokemonSpeciesByName(name),
            ]);
            set(
              () => ({ pokemon: { ...mainData, ...secondaryData } }),
              false,
              'updatePokemon'
            );
          },
          reset: () => set(() => ({ ...initialStore })),
        }),
        {
          name: 'pokedex',
        }
      )
    )
  )
);

const pokemonName = usePokedexStore.subscribe(
  (state) => state.activePokemonName,
  (next, prev) => {
    if (next) {
      usePokedexStore.getState().updatePokemon(next);
    }
  }
);
