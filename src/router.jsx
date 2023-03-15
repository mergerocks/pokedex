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
      return { ...data, ...species };
    },
  },
]);
