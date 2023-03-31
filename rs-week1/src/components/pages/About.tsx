import React, { useEffect } from 'react';

interface IAboutPageProps {
  onChangeNamePage: (namePage: string) => void;
}

function About({ onChangeNamePage }: IAboutPageProps) {
  useEffect(() => {
    onChangeNamePage('About US Page');
  }, [onChangeNamePage]);

  return (
    <>
      <h3>About Us page</h3>
    </>
  );
}

export default About;
