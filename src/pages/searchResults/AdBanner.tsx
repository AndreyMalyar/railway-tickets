import AdData from "./data/promo.ts";

const arrowIcon = <svg width="9" height="10" viewBox="0 0 9 10" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0H3.17181L8.23789 5L3.17181 10H0L5.08811 5L0 0Z"/>
</svg>


function AdBanner() {
    return (
        <div className="banners">
            <div className="banners__box">
                {AdData.map(item => (
                    <div key={item.id} className="banners__item">
                        <a href="#" className="banners__item-link">{item.title}<span className="banners__item-icon">{arrowIcon}</span></a>
                        <img className="banners__item-img" src={item.image} alt={item.title}/>
                    </div>
                ))}
            </div>
            <p className="banners__description">
                Our trains don't just transport people, they transport emotions and stories! From the mountains of Darjeeling to the beaches of Goa, we connect more than just stations. As Raj Koothrappali would say, "In India, we don't just ride trains, we experience cosmic journeys with occasional cow delays." Book now and embrace the colorful chaos!
            </p>
        </div>
    )
}

export default AdBanner;