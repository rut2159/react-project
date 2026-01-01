
const ShoppingListWhenTraveling = [
  { id: 1, name: "gift", price: 100, quantity: 1 },
];

export const getShoppingListWhenTraveling = () => {
    return new Promise((resolve, reject) => {
        const num = Math.random() * 1;
        if (num > 1) {
            reject('something happen');
        } else {
            resolve([...ShoppingListWhenTraveling]);
        }
    })
}
export const addNewProductWhenTraveing = (b) => {
    ShoppingListWhenTraveling.push(b);
    return Promise.resolve([...ShoppingListWhenTraveling]);
}
export const deleteProductWhenTraveling = (id) => {
    const index = ShoppingListWhenTraveling.findIndex(b => b.id === id);
    ShoppingListWhenTraveling.splice(index, 1);
    return Promise.resolve([...ShoppingListWhenTraveling]);
}