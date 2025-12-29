import React from 'react';

function NewComponent({ title = 'ברוכים הבאים' }) {
  return (
    <section className="new-component">
      <h2>{title}</h2>
    </section>
  );
}

export default NewComponent;