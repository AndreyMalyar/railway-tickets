
import bgRec_1 from '../../../assets/RecBg-2.png'
import bgRec_2 from '../../../assets/RecBg-1.jpg'

type ImageType = typeof bgRec_1 | typeof bgRec_2
type AdItem = Record<'image', ImageType> & Record<'link', "Planning your holidays">
type AdItems = AdItem[]


export default [
    {image: bgRec_1, link: "Planning your holidays"},
    {image: bgRec_2, link: "Planning your holidays"},
] satisfies AdItems

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