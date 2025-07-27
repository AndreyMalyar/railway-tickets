import type {FC, JSX} from 'react'
import {Link, useLocation} from "react-router-dom";
import {useAppSelector} from "../../store/hooks.ts";

interface LinkProps {
    label: string;
    to: string;
}

const MenuItem: FC<LinkProps> = ({label, to}: LinkProps): JSX.Element => {
    const location = useLocation();
    const theme = useAppSelector(state => state.ui.theme);
    const isActive = location.pathname === to;

    return <Link
        className={`nav__menu-item nav__menu-item--${theme} ${isActive ? 'active' : ''}`}
        to={to}
    >
        {label}
    </Link>
}

export default MenuItem