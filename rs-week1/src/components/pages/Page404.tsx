import React, { useEffect } from 'react';

interface IPage404Props {
  onChangeNamePage: (namePage: string) => void;
}

function Page404({ onChangeNamePage }: IPage404Props) {
  useEffect(() => {
    onChangeNamePage('Page 404');
  }, [onChangeNamePage]);

  return (
    <>
      <h3>Page not found 404</h3>
    </>
  );
}

export default Page404;
