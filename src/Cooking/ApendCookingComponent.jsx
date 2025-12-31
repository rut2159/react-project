import React from 'react';
import shabbatCookingList from './shabbatCookingList';
import ShowSection from './show';

export default function ApendCookingComponent() {
    return (
        <div>
            <h2>All shabbat cooking sections</h2>
            {Object.entries(shabbatCookingList).map(([sectionName, items]) => (
                <ShowSection key={sectionName} sectionName={sectionName} items={items} />
            ))}
        </div>
    );
}