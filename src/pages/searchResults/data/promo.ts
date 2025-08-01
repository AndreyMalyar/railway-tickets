
import bgRec_1 from '../../../assets/RecBg-2.png'
import bgRec_2 from '../../../assets/RecBg-1.jpg'

type ImageType = typeof bgRec_1 | typeof bgRec_2
type AdItem = {
    id: number,
    image: ImageType,
    title: `${any}${string}`,
    url?: `https://${string}`,
}


export default [
    {id: 1, image: bgRec_2, title: "Planning your holidays"},
    {id: 2, image: bgRec_1, title: "Train tourism packages"},
] satisfies AdItem[]

/*
// type для Получения данных с сервера
type ReclamaItem = Record<'image', string> & Record<'link', "Planning your holidays">

type ReclamaType = ReclamaItem[]

// Пример данных с сервера
export default [
    {image: "https://example.com/images/bg-rec-1.jpg", link: "Planning your holidays"},
    {image: "https://example.com/images/bg-rec-2.jpg", link: "Planning your holidays"},
] satisfies ReclamaType
 */