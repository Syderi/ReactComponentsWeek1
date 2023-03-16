import React, { Component } from 'react';

interface IFormPageProps {
  onChangeNamePage: (namePage: string) => void;
}

class FormPage extends Component<IFormPageProps> {
  componentDidMount() {
    this.props.onChangeNamePage('About US Page');
  }

  render() {
    return (
      <>
        <h3>Form page</h3>
      </>
    );
  }
}

export default FormPage;
