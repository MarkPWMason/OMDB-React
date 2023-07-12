import React, { useContext } from 'react';
import { Contexts } from '../store/context/context';

const Blurer = () => {
  const Context = useContext(Contexts);
  const showModal = Context.showModal;
  return (
    <>
      {showModal && (
        <div
          style={{
            width: '100%',
            height: '100vh',
            zIndex: 2,
            position: 'fixed',
            top: 0,
            left: 0,
            backdropFilter: 'blur(5px)',
          }}
        ></div>
      )}
    </>
  );
};

export default Blurer;
