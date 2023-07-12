import { createContext, useState } from 'react';

export const Contexts = createContext<{
  showModal: boolean;
  setShowModal: (showModalParam: boolean) => void;
  title: string;
  setTitle: (showTitle: string) => void;
  cast: string;
  setCast: (showCast: string) => void;
  director: string;
  setDirector: (showDirector: string) => void;
  plot: string;
  setPlot: (showPlot: string) => void;
  rating: any[];
  setRating: (showRating: any[]) => void;
  poster: string;
  setPoster: (showPoster: string) => void;
  page: number;
  setPage: (page: number) => void;
  totalResults?: number;
  setTotalResults: (totalResults: number) => void;
}>({
  showModal: false,
  setShowModal: (showModalParam: boolean) => {},
  title: '',
  setTitle: (showTitle: string) => {},
  cast: '',
  setCast: (showCast: string) => {},
  director: '',
  setDirector: (showDirector: string) => {},
  plot: '',
  setPlot: (showPlot: string) => {},
  rating: [],
  setRating: (showRating: any[]) => {},
  poster: '',
  setPoster: (showPoster: string) => {},
  page: 1,
  setPage: (page: number) => {},
  totalResults: undefined,
  setTotalResults: (totalResults: number) => {},
});

const ContextsProvider = ({ children }: { children: any }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [cast, setCast] = useState<string>('');
  const [director, setDirector] = useState<string>('');
  const [plot, setPlot] = useState<string>('');
  const [rating, setRating] = useState<any[]>([]);
  const [poster, setPoster] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<undefined | number>(
    undefined
  );

  const value = {
    showModal,
    setShowModal,
    title,
    setTitle,
    cast,
    setCast,
    director,
    setDirector,
    plot,
    setPlot,
    rating,
    setRating,
    poster,
    setPoster,
    page,
    setPage,
    totalResults,
    setTotalResults
  };
  return <Contexts.Provider value={value}>{children}</Contexts.Provider>;
};

export default ContextsProvider;
