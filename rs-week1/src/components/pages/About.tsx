import React, { Component } from 'react';

interface IAboutPageProps {
  onChangeNamePage: (namePage: string) => void;
}

class About extends Component<IAboutPageProps> {
  componentDidMount() {
    this.props.onChangeNamePage('About US Page');
  }

  render() {
    return (
      <>
        <h3>About US page</h3>
      </>
    );
  }
}

export default About;
