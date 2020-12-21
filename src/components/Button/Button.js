import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from '../Components.module.css';

class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  scroll = () => {
    this.props.onClick();
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    return (
      <div className={s.buttonDiv}>
        <button type="button" onClick={this.scroll} className={s.Button}>
          Load more
        </button>
      </div>
    );
  }
}

export default Button;
