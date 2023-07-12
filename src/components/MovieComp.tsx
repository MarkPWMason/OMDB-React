import React, { useContext } from 'react';
import { Contexts } from '../store/context/context';
import ImgComponent from './ImgComponent';

import styles from './MovieComp.module.css';
import Pagination from './Pagination';

const MovieComp = ({
  searchData,
  searchMovie,
}: {
  searchData: any;
  searchMovie: any;
}) => {
  const Context = useContext(Contexts);
  console.log(Context.totalResults);
  return (
    <div className={styles.container}>
      <div className={styles.movieContent}>
        {searchData &&
          searchData.map((s: any, index: number) => {
            return (
              <div key={index} className={styles.media}>
                <ImgComponent
                  poster={s.Poster}
                  src={s.Poster}
                  alt={s.Title}
                  title={s.Title}
                />
              </div>
            );
          })}
      </div>
      <div className={styles.pagination}>
        {typeof Context.totalResults !== 'undefined' && Context.totalResults >= 1 && (
          <Pagination
            className={styles.paginationBar}
            currentPage={Context.page}
            totalPages={Context.totalResults}
            onPageChange={(page: number) => {
              Context.setPage(page);
              console.log('upodating page to ', page);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MovieComp;
