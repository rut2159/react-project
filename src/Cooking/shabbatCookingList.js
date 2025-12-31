const shabbatCookingList = {
  basic: [
    "חלה",
    "סלט ירקות",
    "טחינה",
    "חומוס"
  ],

  firstMeal: [
    "דג חריימה",
    "מרק עוף",
    "עוף בתנור",
    "אורז לבן"
  ],

  secondMeal: [
    "חמין",
    "קוגל אטריות",
    "סלט כרוב"
  ],

  thirdMeal: [
    "טונה עם ירקות",
    "חצילים במיונז",
    "לחמניות"
  ]
};

export default shabbatCookingList;
export const getShabbatCookingList = () => shabbatCookingList;
// export function getShabbatCookings() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(shabbatCookingList); // אחרי 1 שניה מחזירה את הנתונים
//     }, 1000);
//   });
// }