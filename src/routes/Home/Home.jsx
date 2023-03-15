import { useLoaderData, Link } from 'react-router-dom';
import styles from './Home.module.css';

export const Home = () => {
  const pokemonList = useLoaderData();
  return (
    <div className={styles.container}>
      <h1>pokedex</h1>

      <ul className={styles.list}>
        {pokemonList.map((name) => (
          <li style={{ margin: '0 8px 6px 0' }} key={name}>
            <Link className={styles.link} to={`/${name}`}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
