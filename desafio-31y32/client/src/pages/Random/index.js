import { useEffect, useState } from 'react';

import styles from './index.module.css';

const Random = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [random, setRandom] = useState(null);
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * (1000 - 1 + 1) + 1);
    // const blockTest = 500000000;
    const controller = new AbortController();

    const fetchRandom = async () => {
      try {
        const response = await fetch(`/random?cant=${randomNumber}`, {
          credentials: 'include',
          signal: controller.signal,
        });

        const data = await response.json();

        setRandom(data);
        console.log(data);
        setIsLoading(false);
      } catch (err) {}

      // const data = await response.json();

      // if (!data.email) {
      //   dispatch({ type: 'LOAD_USER', payload: null });
      //   return;
      // }

      // dispatch({ type: 'LOAD_USER', payload: data.email });
    };

    fetchRandom();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <section>
      <div className="main-container">
        <h1 className={styles.page_title}>Random</h1>
        <div className={styles.random}>
          <h2>Numero</h2>
          <div className={styles.random_wrapper}>
            {isLoading && <p>Loading...</p>}
            {!isLoading && <p>{random.number}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Random;
