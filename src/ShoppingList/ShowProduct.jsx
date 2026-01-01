import { useState } from "react";
export function ShowProduct({ product }) {
    if (product == null)
        return (<>error</>)
    const [done, setDone] = useState(false);
    function updateClicked() {
        setDone(prev => !prev);
    }
    return (
        <div className={`product-card show-product`}>
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-meta"> <span>Price: {product.price}</span> <span>Qty: {product.quantity}</span></div>
            </div>
            <div className="product-controls">
                <button className={`toggle-btn ${done ? 'active' : ''}`} onClick={updateClicked} aria-pressed={done} aria-label={`Mark ${product.name} done`}>{done ? '✓' : '✕'}</button>
            </div>
        </div>
    )
}