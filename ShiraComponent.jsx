import React from 'react';
import PropTypes from 'prop-types';
import styles from './ShiraComponent.module.css';

const ShiraComponent = ({ title = 'Shira', subtitle, onClick }) => (
  <div className={styles.container}>
    <h2 className={styles.title}>{title}</h2>
    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    <button className={styles.button} onClick={onClick}>לחץ</button>
  </div>
);

ShiraComponent.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  onClick: PropTypes.func,
};

export default ShiraComponent;
