import { getBasicShoppingList } from './data/BasicShoppingList.js';
import { getGuestsShoppingList } from "./data/guestsShoppingList.js";
import { getShoppingListWhenTraveling } from "./data/ShoppingListWhenTraveling.js";
import { useState, useEffect } from "react";
import { ShowProduct } from "./ShowProduct.jsx";
export const ShowListToCurrentShabbat = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const cur = getBasicShoppingList();
    const loadList = async () => {
        setLoading(true);
        try {
            const list = await cur;
            setList(list);
        } catch (error) {
            console.log('something bad happen', error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        loadList();
    }, [])
    return (
        <>
            <h1>Shopping List</h1>
            <h4> {loading && 'loading....'} </h4>
            <h4> {error && 'something bad happen, try again later'} </h4>
            {list.map(b => <ShowProduct key={b.id} product={b} />)}
        </>
    )

}