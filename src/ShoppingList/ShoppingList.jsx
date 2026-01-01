import { useState, useEffect } from "react";
//לרשימת קניות בסיסית
import { addNewProduct, getBasicShoppingList, deleteProduct } from './data/BasicShoppingList.js';
//לרשימת קניות לאורחים
import { getGuestsShoppingList, addNewProductForGuests, deleteProductForGuests } from "./data/guestsShoppingList.js";
//לרשימת קניות מתנות עבור אורחים
import { getShoppingListWhenTraveling, addNewProductWhenTraveing, deleteProductWhenTraveling } from "./data/ShoppingListWhenTraveling.js";
//רכיב להצגת מוצר בודד
import { Product } from "./Product.jsx";
import { ShowListToCurrentShabbat } from "./ShowListToCurrentShabbat.jsx";

export const ShoppingList = () => {
    const [BasicList, setBasicList] = useState([]);
    const [GuestsList, setGuestsList] = useState([]);
    const [TravelingList, setTravelingList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const deleteProductById = async (id, list) => {
        if (list === 'basic') {
            const newProducts = await deleteProduct(id);
            setBasicList(newProducts);
        } else if (list === 'guests') {
            const newProducts = await deleteProductForGuests(id);
            setGuestsList(newProducts);
        }
        else if (list === 'traveling') {
            const newProducts = await deleteProductWhenTraveling(id);
            setTravelingList(newProducts);
        }
    };
    const loadAllLists = async () => {
        setLoading(true);
        try {
            const basiclist = await getBasicShoppingList();
            setBasicList(basiclist);
            const guestsList = await getGuestsShoppingList();
            setGuestsList(guestsList);
            const travelingList = await getShoppingListWhenTraveling();
            setTravelingList(travelingList);
        } catch (error) {
            console.log('something bad happen', error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadAllLists();
    }, [])
    const addProduct = async (list, event) => {
        event.preventDefault();
        const newProduct = {
            id: list === 'basic' ? BasicList.length + 1 : GuestsList.length + 201,
            name: event.target.name.value,
            price: event.target.price.value,
            quantity: event.target.quantity.value,
        }
        event.target.reset();
        if (list === 'basic') {
            const newProducts = await addNewProduct(newProduct);
            setBasicList(newProducts);
        }
        if (list === 'guests') {
            const newProducts = await addNewProductForGuests(newProduct);
            setGuestsList(newProducts);
        }
        if (list === 'traveling') {
            const newProducts = await addNewProductWhenTraveing(newProduct);
            setTravelingList(newProducts);
        }
    }
    return (
        <div className="shopping-lists-grid">
            <section className="list-column basic">
                <h2 className="list-title">Basic Shopping List</h2>
                <h4 className="status"> {loading && 'loading....'} </h4>
                <h4 className="status error"> {error && 'something bad happen, try again later'} </h4>
                <div className="list-items">
                    {BasicList.map(b => <Product key={b.id} className="product-card" product={b} onDelete={(id) => deleteProductById(id, 'basic')} />)}
                </div>
                <form className="add-form" onSubmit={(event) => addProduct('basic', event)}>
                    <input className="input" type="text" name="name" placeholder='name' required />
                    <input className="input" type="number" name="price" placeholder='price' required />
                    <input className="input" type="number" name="quantity" placeholder='quantity' required />
                    <button className="btn primary"> add new product </button>
                </form>
            </section>

            <section className="list-column guests">
                <h2 className="list-title">Guests Shopping List</h2>
                <h4 className="status"> {loading && 'loading....'} </h4>
                <h4 className="status error"> {error && 'something bad happen, try again later'} </h4>
                <div className="list-items">
                    {GuestsList.map(b => <Product key={b.id} className="product-card" product={b} onDelete={(id) => deleteProductById(id, 'guests')} />)}
                </div>
                <form className="add-form" onSubmit={(event) => addProduct('guests', event)}>
                    <input className="input" type="text" name="name" placeholder='name' required />
                    <input className="input" type="number" name="price" placeholder='price' required />
                    <input className="input" type="number" name="quantity" placeholder='quantity' required />
                    <button className="btn primary"> add new product </button>
                </form>
            </section>

            <section className="list-column traveling">
                <h2 className="list-title">Traveling Shopping List</h2>
                <h4 className="status"> {loading && 'loading....'} </h4>
                <h4 className="status error"> {error && 'something bad happen, try again later'} </h4>
                <div className="list-items">
                    {TravelingList.map(b => <Product key={b.id} className="product-card" product={b} onDelete={(id) => deleteProductById(id, 'traveling')} />)}
                </div>
                <form className="add-form" onSubmit={(event) => addProduct('traveling', event)}>
                    <input className="input" type="text" name="name" placeholder='name' required />
                    <input className="input" type="number" name="price" placeholder='price' required />
                    <input className="input" type="number" name="quantity" placeholder='quantity' required />
                    <button className="btn primary"> add new product </button>
                </form>
            </section>

        </div>

    )
}