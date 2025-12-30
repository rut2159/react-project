export const guestsShoppingList = [
    { id: 201, name: "wine for guests", price: 10, quantity: 1 },
    { id: 202, name: "cake", price: 10, quantity: 1 }
];

export const getGuestsShoppingList = () => {
    return new Promise((resolve, reject) => {
        const num = Math.random() * 2;
        if (num > 2) {
            reject('something happen');
        } else {
            resolve([...guestsShoppingList]);
        }
    })
}
export const addNewProductForGuests = (g) => {
    guestsShoppingList.push(g);
    return Promise.resolve([...guestsShoppingList]);
}
export const deleteProductForGuests = (id) => {
    const index = guestsShoppingList.findIndex(g => g.id === id);
    guestsShoppingList.splice(index, 1);
    return Promise.resolve([...guestsShoppingList]);
}