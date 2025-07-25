import type {FC, JSX} from 'react'
import {Link, useLocation} from "react-router-dom";

interface LinkProps {
    label: string;
    to: string;
}

const MenuItem: FC<LinkProps> = ({label, to}: LinkProps): JSX.Element => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return <Link
        className={`nav__menu-item ${isActive ? 'active' : ''}`}
        to={to}
    >
        {label}
    </Link>
}

export default MenuItem