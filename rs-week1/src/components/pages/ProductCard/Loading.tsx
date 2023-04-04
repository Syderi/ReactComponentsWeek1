import React from 'react';
import { CSSProperties } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const override: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 'auto auto',
  borderColor: 'blue',
};

function Loader() {
  return (
    <ClipLoader
      color={'#ffffff'}
      loading={true}
      cssOverride={override}
      size={200}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}

export default Loader;
