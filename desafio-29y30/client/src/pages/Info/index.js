import { useEffect, useState } from 'react';

import styles from './index.module.css';

const Info = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchInfo = async () => {
      try {
        const response = await fetch('/info', {
          credentials: 'include',
          signal: controller.signal,
        });

        const data = await response.json();

        setInfo(data);
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

    fetchInfo();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <section>
      <div className="main-container">
        <h1 className={styles.page_title}>Info</h1>
        <div className={styles.list}>
          <h2>Lista</h2>
          <div className={styles.list_wrapper}>
            {isLoading && <p>Loading...</p>}
            {!isLoading && (
              <>
                <div>
                  <h3>Argumentos de entrada</h3>
                  <ul>
                    {info.arguments.map((arg) => (
                      <li key={arg}>{arg}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>Sistema operativo</h3>
                  {info.platform}
                </div>
                <div>
                  <h3>Version node</h3>
                  {info.node_version}
                </div>
                <div>
                  <h3>Memoria total reservada</h3>
                  {info.memory.rss}
                </div>
                <div>
                  <h3>Path</h3>
                  {info.path}
                </div>
                <div>
                  <h3>Process Id</h3>
                  {info.id}
                </div>
                <div>
                  <h3>Directory</h3>
                  {info.directory}
                </div>
                <div>
                  <h3>Numero procesadores</h3>
                  {info.numProcessors}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
