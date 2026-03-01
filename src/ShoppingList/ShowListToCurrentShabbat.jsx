import { useGlobalContext } from "../context/GlobalContext.jsx";
import { ShowProduct } from "./ShowProduct.jsx";

export const ShowListToCurrentShabbat = () => {
    const { shoppingBase } = useGlobalContext();

    return (
        <>
            <h1>Shopping List (from context)</h1>
            {shoppingBase && shoppingBase.length === 0 && <p>אין פריטים ברשימת קניות.</p>}
            {shoppingBase.map(b => <ShowProduct key={b.id} product={b} />)}
        </>
    )

}