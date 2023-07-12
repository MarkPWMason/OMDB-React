import React, { useContext, useRef, useState } from 'react';
import { Contexts } from '../store/context/context';

import styles from './ImgComponent.module.css';

const ImgComponent = ({
  src,
  alt,
  title,
  poster,
}: {
  src: string;
  alt: string;
  title: string;
  poster: string;
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const [movieInfo, setMovieInfo] = useState([]);
  const [locked, setLocked] = useState(false);
  const Context = useContext(Contexts);

  const sendMovieRequest = () => {
    const localCache = sessionStorage.getItem('specific-' + title);

    if (localCache) {
      //@ts-ignore
      setMovieInfo(JSON.parse(localCache));
    } else {
      const apiURL = `http://127.0.0.1:8000/api/omdb?t=${title}`;
      if (!locked) {
        setLocked(true);
        fetch(apiURL, {
          method: 'GET',
        })
          .then((res) => {
            if (res.status === 200) {
              return res.json();
            }
          })
          .then((data) => {
            console.log("data: ", data);
            setLocked(false);
            sessionStorage.setItem('specific-' + title, JSON.stringify(data));
          })
          .catch((er) => {
            setLocked(false);
            console.error(er);
          });
      }
    }
  };

  const mouseOver = (e: any) => {
    if (imgRef.current && divRef.current) {
      imgRef.current.style.visibility = 'hidden';
      divRef.current.style.visibility = 'visible';
      sendMovieRequest();
    }
  };

  const mouseOut = (e: any) => {
    if (imgRef.current && divRef.current) {
      imgRef.current.style.visibility = 'visible';
      divRef.current.style.visibility = 'hidden';
    }
  };

  const movieModalPopup = () => {
    Context.setTitle(title);
    Context.setPoster(poster);
    //@ts-ignore
    Context.setDirector(movieInfo.Director);
    //@ts-ignore
    Context.setCast(movieInfo.Actors);
    //@ts-ignore
    Context.setPlot(movieInfo.Plot);
    //@ts-ignore
    Context.setRating(movieInfo.Ratings);
    Context.setShowModal(true);
  };
  return (
    <div
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
      className={styles.image}
      onClick={movieModalPopup}
    >
      <div>
        <img className={styles.imageComp} ref={imgRef} src={src} alt={alt} />
      </div>
      <div ref={divRef} className={styles.details}>
        <h1 className={styles.title}>{title}</h1>
        {/* @ts-ignore */}
        <p className={styles.text}>{movieInfo.Plot}</p>
      </div>
    </div>
  );
};

export default ImgComponent;
