import { useLoaderData } from 'react-router-dom';
import styles from './Pokemon.module.css';

const colors = {
  blue: { background: 'blue', title: 'darkblue' },
  brown: { background: 'brown', title: 'darkbrown' },
  gray: { background: 'gray', title: 'darkgray' },
  green: { background: 'green', title: 'darkgreen' },
  pink: { background: 'pink', title: 'darkpink' },
  purple: { background: 'purple', title: 'darkpurple' },
  red: { background: 'red', title: 'darkred' },
  white: { background: 'white', title: 'black' },
  yellow: { background: 'yellow', title: 'orange' },
};

export const Pokemon = () => {
  const data = useLoaderData();

  return (
    <div className={styles.container} style={{ backgroundColor: colors[data.color]?.background }}>
      <header className={styles.header}>
        <p className={styles.id}>#{String(data.id).padStart(3, '0')}</p>
        <h2 className={styles.name}>{data.name}</h2>
      </header>
      <main className={styles.main}>
        <h1 style={{ color: colors[data.color]?.title }} className={styles.title}>
          {data.nameJA}
        </h1>
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={data.image} alt={data.name} />
        </div>
      </main>
    </div>
  );
};
