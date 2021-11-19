import React, { Component } from 'react';
import IntroModal from './introModal';

export class MobileApp extends Component {
  render() {
    return (
      <>
        {this.props.modalIsOpen
          ? <IntroModal mobile={this.props.mobile} toggleModal={this.props.toggleModal} />
          : <>
          </>}
      </>
    )
  }
}

export default MobileApp
