import paneerTikka from '../assets/paneerTikka.jpg'
import grilledChicken from '../assets/grilledChicken.jpg'
import alooParatha from '../assets/alooParatha.jpg'

type ImageType = typeof paneerTikka | typeof grilledChicken | typeof alooParatha;

type FoodItem = {
    id: number,
    image: ImageType,
    title: `${any}${string}`,
    price: number,
}

export default [
    {
        id: 1,
        image: paneerTikka,
        title: "Paneer Tikka Rice Bowl - Mini",
        price: 200,
    },
    {
        id: 2,
        image: grilledChicken,
        title: "Grilled Tandoori Chicken With Dry Fruits",
        price: 500,
    },
    {
        id: 3,
        image: alooParatha,
        title: "Aloo Paratha Curd Meal (2 Pcs)",
        price: 120,
    },
] satisfies FoodItem[]