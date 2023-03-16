import { useLoaderData, Link } from 'react-router-dom';
import styles from './Pokemon.module.css';

export const Pokemon = () => {
  const data = useLoaderData();

  return (
    <>
      <style>{`:root {
        background-color: ${data?.backgroundColor};
      }`}</style>
      <div className={styles.container}>
        <header className={styles.header}>
          <Link className={styles.back} to="/">
            {'< '}back to list
          </Link>
          <div className={styles.info}>
            <p className={styles.id}>#{String(data.id).padStart(3, '0')}</p>
            <h2 style={{ color: data.color }} className={styles.name}>
              {data.name}
            </h2>
          </div>
        </header>
        <main className={styles.main}>
          <h1 style={{ color: data?.color }} className={styles.title}>
            {data.nameJA}
          </h1>
          <div className={styles.imageWrapper}>
            <img className={styles.image} src={data.image} alt={data.name} />
          </div>
        </main>
        <nav className={styles.nav}>
          {data.prev ? (
            <Link
              aria-label={data.prev.name}
              className={styles.navLink}
              to={`/${data.prev.name}`}>
              <img
                className={styles.iconNav}
                src={data.prev.icon}
                alt={data.prev.name}
              />
            </Link>
          ) : (
            <div />
          )}
          {data.next && (
            <Link
              aria-label={data.next.name}
              className={styles.navLink}
              to={`/${data.next.name}`}>
              <img
                className={styles.iconNav}
                src={data.next.icon}
                alt={data.next.name}
              />
            </Link>
          )}
        </nav>
      </div>
    </>
  );
};
