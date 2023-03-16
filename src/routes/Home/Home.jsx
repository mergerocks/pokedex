import { useMemo, useState } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import styles from './Home.module.css';

export const Home = () => {
  const [search, setSearch] = useState('');
  const pokemonList = useLoaderData();
  const filteredPokemonList = useMemo(
    () =>
      pokemonList.filter((name) =>
        name.toLowerCase().includes(search.toLowerCase())
      ),
    [pokemonList, search]
  );
  return (
    <div className={styles.container}>
      <h1 className={styles.hiddenTitle}>pokedex</h1>

      <header className={styles.header}>
        <img
          className={styles.logo}
          src="/logo.png"
          alt="pokedex"
        />
        <input
          placeholder="Search..."
          className={styles.search}
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img
          className={styles.image}
          src="/android-chrome-192x192.png"
          alt="pokedex"
        />
      </header>

      <ul className={styles.list}>
        {filteredPokemonList.map((name) => (
          <li className={styles.listItem} key={name}>
            <Link className={styles.link} to={`/${name}`}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
