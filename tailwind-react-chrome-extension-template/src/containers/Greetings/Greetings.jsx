import React, { Component } from 'react';
import icon from '../../assets/img/icon-128.png';

class GreetingComponent extends Component {
  state = {
    name: 'dev',
  };

  render() {
    return (
      <div>
        <img src={icon} alt="extension icon" />
      </div>
    );
  }
}

export default GreetingComponent;
