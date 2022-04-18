import React, { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null
  }

  getStyle = () => {
    return {
      color: this.color,
      fontSize: '13px',
      textAlign: 'center'
    };
  }

  render() {
    return (
      <div className='m-auto'>
        <p style={this.getStyle()}>
          {this.props.text}
        </p>
      </div>
    );
  }
}
class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'blue';
  }
}

class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'orange';
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'red';
  }
}

export { InfoAlert, ErrorAlert, WarningAlert };

export default Alert;
