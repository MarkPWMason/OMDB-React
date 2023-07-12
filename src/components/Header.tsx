import React, { useContext, useEffect, useState } from 'react';
import { Contexts } from '../store/context/context';

import styles from './Header.module.css';

const Header = ({
  searchData,
  setSearchData,
}: {
  searchData: any;
  setSearchData: any;
}) => {
  const [userSearch, setUserSearch] = useState('');
  const [year, setYear] = useState('all');
  const [movieType, setMovieType] = useState('');
  const Context = useContext(Contexts);

  const sendTitleRequest = () => {
    const localCacheKey = 'search-' + userSearch + Context.page + year + movieType
    const localCache = sessionStorage.getItem(localCacheKey);

    if (!localCache) {
      const apiURL = `http://127.0.0.1:8000/api/omdb?s=${userSearch}&page=${
        Context.page
      }${
        year !== 'all' && year != null ? `&y=${year}` : ''
        //@ts-ignore
      }${movieType !== '' ? `&type=${movieType}` : ''}`;

      fetch(apiURL, {
        method: 'GET',
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((data) => {
          //set to context data.totalResults if its not there then hide the pagination
          console.log("data: ", data);
          sessionStorage.setItem(localCacheKey, JSON.stringify(data))
          Context.setTotalResults(Math.ceil(data.totalResults / 10));
          setSearchData(data.Search);
        })
        .catch((er) => {
          console.error(er);
        });
    } else {
      console.log('got from local')
      const data = JSON.parse(localCache)
      Context.setTotalResults(Math.ceil(data.totalResults / 12));
      setSearchData(data.Search);
    }
  };
  //When ever any of these values change it will re do the search
  useEffect(() => {
    sendTitleRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, movieType, Context.page]);

  return (
    <div className={styles.container}>
      <div className={styles.headerContent}>
        <h1 className={styles.title}>OMDB</h1>
        <div className={styles.searchContainer}>
          <input
            value={userSearch}
            onChange={(e) => {
              setUserSearch(e.target.value);
            }}
            className={styles.input}
            type="text"
            placeholder="Search for Movie/TV Show"
          />
          <button
            onClick={() => {
              Context.setPage(1)
              sendTitleRequest();
            }}
            className={styles.searchBtn}
          >
            Search
          </button>
        </div>
      </div>

      <form
        className={styles.radio}
        onChange={(e) => {
          Context.setPage(1)
          //@ts-ignore
          setYear(e.target.value);
        }}
      >
        <label className={styles.radioText} htmlFor="all">
          All
        </label>
        <input
          className={styles.radioContent}
          type="radio"
          id="all"
          name="movieYear"
          checked={year === 'all'}
          value="all"
        />

        <label className={styles.radioText} htmlFor="2022">
          2022
        </label>
        <input
          className={styles.radioContent}
          type="radio"
          id="2022"
          name="movieYear"
          checked={year === '2022'}
          value="2022"
        />

        <label className={styles.radioText} htmlFor="2021">
          2021
        </label>
        <input
          className={styles.radioContent}
          type="radio"
          id="2021"
          name="movieYear"
          checked={year === '2021'}
          value="2021"
        />

        <label className={styles.radioText} htmlFor="2020">
          2020
        </label>
        <input
          className={styles.radioContent}
          type="radio"
          id="2020"
          name="movieYear"
          checked={year === '2020'}
          value="2020"
        />

        <label className={styles.radioText} htmlFor="2019">
          2019
        </label>
        <input
          className={styles.radioContent}
          type="radio"
          id="2019"
          name="movieYear"
          checked={year === '2019'}
          value="2019"
        />

        <label className={styles.radioText} htmlFor="2018">
          2018
        </label>
        <input
          className={styles.radioContent}
          type="radio"
          id="2018"
          name="movieYear"
          checked={year === '2018'}
          value="2018"
        />

        <label className={styles.radioText} htmlFor="2017">
          2017
        </label>
        <input
          className={styles.radioContent}
          type="radio"
          id="2017"
          name="movieYear"
          checked={year === '2017'}
          value="2017"
        />

        <label className={styles.radioText} htmlFor="2016">
          2016
        </label>
        <input
          className={styles.radioContent}
          type="radio"
          id="2016"
          name="movieYear"
          checked={year === '2016'}
          value="2016"
        />
      </form>
      <div className={styles.optionBtn}>
        <button
          onClick={() => {
            Context.setPage(1)
            setMovieType('movie');
          }}
          className={styles.btn}
        >
          Movies
        </button>
        <button
          value="TV Show"
          onClick={(e) => {
            Context.setPage(1)
            setMovieType('series');
          }}
          className={styles.btn}
        >
          TV Shows
        </button>
      </div>
      <div className={styles.mediaType}>
        <h1>{movieType.toUpperCase()}</h1>
      </div>
    </div>
  );
};

export default Header;
