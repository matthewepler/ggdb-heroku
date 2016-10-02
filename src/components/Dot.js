import React, { Component } from 'react';
import classNames from 'classnames';

// styles
import '../assets/stylesheets/Dot.scss';

class Dot extends Component {
  constructor() {
    super();
  }

  render() {
  	const dotClasses = classNames({
      'dot' : true,
      'dot-selected' : this.props.selected == this.props.val,
      'dot-fat' : this.props.val.toString().length > 1,
    });

  	return (
  		<p className={dotClasses}>{this.props.val}</p>
  	)
  }
}

export default Dot;
