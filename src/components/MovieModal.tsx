import React, { useContext } from 'react';
import { Contexts } from '../store/context/context';

import styles from './MovieModal.module.css';

const MovieModal = () => {
  const Context = useContext(Contexts);
  const title = Context.title;
  const poster = Context.poster;
  const director = Context.director;
  const cast = Context.cast;
  const plot = Context.plot;
  const ratings = Context.rating;
  const show = Context.showModal;

  const closeModal = () => {
    Context.setShowModal(false);
  };
  return (
    <>
      {show && (
        <div className={styles.movieModal}>
          <button onClick={closeModal} className={styles.exitBtn}>
            X
          </button>
          <img className={styles.poster} src={poster} alt={title} />
          <div className={styles.textContent}>
            <h1>{title}</h1>
            <h2>Director(s)</h2>
            <p>{director}</p>
            <h2>Cast</h2>
            <p>{cast}</p>
            <h2>Plot</h2>
            <p>{plot}</p>
            <div className={styles.ratings}>
              <table>
                <tr className={styles.tableRow}>
                  <th className={styles.tableContent}>Source</th>
                  <th className={styles.tableContent}>Value</th>
                </tr>
                {ratings && ratings.map((r: any) => {
                  return (
                    <tr className={styles.tableRow}>
                      <td className={styles.tableContent}>{r.Source}</td>
                      <td className={styles.tableContent}>{r.Value}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieModal;
