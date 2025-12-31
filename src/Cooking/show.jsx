import React from 'react';

// Presentational component: renders a named section and its items
export default function ShowSection({ sectionName, items = [] }) {
    return (
        <div className="cooking-section">
            <h3>{sectionName}</h3>
            <ul>
                {items.map((it, idx) => (
                    <li key={idx}>{it}</li>
                ))}
            </ul>
        </div>
    );
}