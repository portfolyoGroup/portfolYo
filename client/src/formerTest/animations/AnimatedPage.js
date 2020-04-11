import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import './AnimatedPage.css'

const Page = ({ 
  children, 
  color, 
  background,
  location: {
    state,
  },
}) => {
  const cx = classNames({
    'page': true,
    'page--prev': state && state.prev,
  });
  return (
    <div 
      className={cx}
      style={{
        color,
        background,
      }}
    >
      {children}
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  background: PropTypes.string,
};

export default withRouter(Page);