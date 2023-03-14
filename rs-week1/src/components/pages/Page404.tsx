import React, { Component } from 'react';

interface IPage404Props {
  onChangeNamePage: (namePage: string) => void;
}

class Page404 extends Component<IPage404Props> {
  componentDidMount() {
    this.props.onChangeNamePage('Page 404');
  }
  render() {
    return (
      <>
        <h3>Page not found 404</h3>
      </>
    );
  }
}

export default Page404;
