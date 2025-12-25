import React from 'react';
// import './NewComponent.css';

const NewComponent = ({ title = 'Hello from NewComponent', onAction }) => {
  return (
    <div className="new-component">
      <h2 className="new-component__title">{title}</h2>
      <p className="new-component__desc">This is a new reusable component.</p>
      <button
        className="new-component__button"
        onClick={() => onAction && onAction('clicked')}
        type="button"
      >
        Click me
      </button>
    </div>
  );
};

export default NewComponent;
