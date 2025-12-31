import React from 'react';
import shabbatCookingList from './shabbatCookingList';
import ShowSection from './show';
import './CookingComponent.css';

function CookingComponent() {
  return (
    <div>
      <h1>ברוכים הבאים לעמוד הבישולים!</h1>
      <div className="shabbat-cooking-list">
        {Object.entries(shabbatCookingList).map(([sectionName, items]) => (
          <ShowSection
            key={sectionName}
            sectionName={sectionName}
            items={items}
          />
        ))}
      </div>
    </div>
  );
}

export default CookingComponent;
