import Menu from "./Menu.tsx";
import './styleHeader.scss';


function Header(){

    return (
        <header className="header">
            <div className="container container__header">
                <Menu />
            </div>
        </header>
    )

}

export default Header;