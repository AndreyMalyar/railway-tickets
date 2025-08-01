import Logo from "../Logo.tsx";
import './styleFooter.scss';


const aboutList = ["How it works", "Featured", "Partnership", "Business Relation"];
const communityList = ["Events", "Blog", "Podcast", "Invite a friend"];
const socialsList = ["Discord", "Instagram", "Twitter", "Facebook"];

function Footer(){

    const renderList = (list: string[]) => {
        return list.map(item => (
            <li key={item}>
                <a href="#" className="footer__nav-link">{item}</a>
            </li>
        ))
    }

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__content">
                    <Logo color="#fff" />
                    <div className="footer__nav-box">
                        <div className="footer__item">
                            <p className="footer__item-title">About</p>
                            <ul className="footer__nav">{renderList(aboutList)}</ul>
                        </div>
                        <div className="footer__item">
                            <p className="footer__item-title">Community</p>
                            <ul className="footer__nav">{renderList(communityList)}</ul>
                        </div>
                        <div className="footer__item">
                            <p className="footer__item-title">Socials</p>
                            <ul className="footer__nav">{renderList(socialsList)}</ul>
                        </div>
                    </div>
                </div>
                <p className="footer__copyright">©2025 RailWay.  All rights reserved</p>
            </div>
        </footer>
    )
}
export default Footer;