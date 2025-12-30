
const BasicShoppingList = [
  { id: 1, name: "fish", price: 100 ,"quantity":1},
  { id: 2, name: "chicken", price: 45,"quantity":1 },
  { id: 3, name: "bread", price: 12 ,"quantity":4},
  { id: 4, name: "wine", price: 35,"quantity":3 },
  { id: 5, name: "rice", price: 10,"quantity": 1}
];

export const getBasicShoppingList = () => {
    return new Promise((resolve, reject) => {
        const num = Math.random() * 5;
        if (num > 5) {
            reject('something happen');
        } else {
            resolve([...BasicShoppingList]);
        }
    })
}
export const addNewProduct = (b) => {
    BasicShoppingList.push(b);
    return Promise.resolve([...BasicShoppingList]);
}
export const deleteProduct = (id) => {
    const index = BasicShoppingList.findIndex(b => b.id === id);
    BasicShoppingList.splice(index, 1);
    return Promise.resolve([...BasicShoppingList]);
}