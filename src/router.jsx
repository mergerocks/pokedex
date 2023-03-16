import { createBrowserRouter } from 'react-router-dom';
import { pokeApi } from './api/pokeApi';
import { Home } from './routes/Home';
import { Pokemon } from './routes/Pokemon';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    loader: async () => {
      return pokeApi.getPokemonList();
    },
  },
  {
    path: '/:name',
    element: <Pokemon />,
    loader: async ({ params }) => {
      const [data, species] = await Promise.all([
        pokeApi.getPokemonByName(params.name),
        pokeApi.getPokemonSpeciesByName(params.name),
      ]);
      const [prev, next] = await Promise.all([
        pokeApi.getPokemonByName(data.id - 1),
        pokeApi.getPokemonByName(data.id + 1),
      ]);
      return { ...data, ...species, prev, next };
    },
  },
]);
