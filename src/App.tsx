import React, { useState } from 'react';
import styles from './App.module.css';
import Footer from './components/Footer';
import Header from './components/Header';
import MovieComp from './components/MovieComp';
import MovieModal from './components/MovieModal';
import Blurer from './components/Blurer';
import ContextsProvider from './store/context/context';

const App = () => {
  const [searchData, setSearchData] = useState([]);
  const [searchMovie] = useState([]);

  return (
    <div className={styles.container}>
      <ContextsProvider>
        <Header searchData={searchData} setSearchData={setSearchData} />
        <MovieComp searchData={searchData} searchMovie={searchMovie} />
        <MovieModal />
        <Blurer />
      </ContextsProvider>
      <Footer />
    </div>
  );
};

export default App;
