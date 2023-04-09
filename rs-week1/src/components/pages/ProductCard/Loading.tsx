import './Loading.css';
import React from 'react';
import { CSSProperties } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const override: CSSProperties = {
  borderColor: 'blue',
};

function Loader() {
  return (
    <div className="loader" data-testid="loader">
      <ClipLoader
        color={'#ffffff'}
        loading={true}
        cssOverride={override}
        size={200}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader;
