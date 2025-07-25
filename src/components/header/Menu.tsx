import MenuItem from './MenuItem.tsx';
import Logo from "../Logo.tsx";

function Menu(){

    const openModal = () => {
        console.log('попытка войти систему, open modal');
    }

    return (
        <nav className="nav">
                <Logo />
                <div className="nav__menu">
                    <MenuItem label="home" to="/" />
                    <MenuItem label="Mobile App" to="/mobile-app" />
                    <MenuItem label="Contact" to="/contact" />
                    <button onClick={openModal}>Sign Up</button>
                </div>
        </nav>
    )
}

export default Menu;