
import { useState } from "react";
import trashIcon from "../assets/trash.svg";
export function Product({ product, onDelete, className }) {
    const [updateForm, setupdateForm] = useState(false);

    if (product == null)
        return (<>error</>)

    function updateClicked() {
        setupdateForm(true);
    }
    function update(event) {
        event.preventDefault();
        setupdateForm(false);
        try {
            if (event.target.name.value != '')
                product.name = event.target.name.value;
            if (event.target.price.value != '')
                product.price = event.target.price.value;
            if (event.target.quantity.value != '')
                product.quantity = event.target.quantity.value;
        }
        catch (error) {
            alert("wrong, please try later")
        }
    }


    return (
        <div className={`product-card ${className || ''}`}>
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-meta"> <span>Price: {product.price}</span> <span>Qty: {product.quantity}</span></div>
            </div>
            <div className="product-controls">
                <button className="btn delete-btn" onClick={() => onDelete(product.id)} aria-label={`Delete ${product.name}`}>
                    <img src={trashIcon} alt="" aria-hidden="true" />
                </button>
                <button className="btn update-toggle" onClick={updateClicked} aria-label={`Edit ${product.name}`}>✎</button>
            </div>
            {updateForm ?
                <form className="update-form" onSubmit={update}>
                    <input className="input" type="text" name="name" placeholder='name' />
                    <input className="input" type="number" name='price' placeholder='price' />
                    <input className="input" type="number" name="quantity" placeholder="quantity" />
                    <button className="btn primary"> update </button>
                </form> : null}
        </div>
    )
}