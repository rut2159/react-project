import React from 'react';

function NewComponent({ title = 'ברוכים הבאים', children }) {
  return (
    <section className="new-component">
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}

export default NewComponent;