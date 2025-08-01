import { ghostIcon } from "./Icons"
import GlobsButton from "../../components/GlobsButton.tsx";
import "./styleNotFound.scss";
import {useNavigate} from "react-router-dom";



function NotFoundPage(){
    const navigate = useNavigate();

    const onClick = () => {
        navigate("/");
    }

    return (
        <section>
            <div className="container not-found">
                <h2 className="not-found__title">
                    4
                    {ghostIcon}
                    4
                </h2>
                <p className="not-found__subtitle">Boo! Page missing!</p>
                <p className="not-found__text">Whoops! This page must be a ghost - it's not here!</p>
                <GlobsButton
                    className="not-found__btn"
                    label="Find shelter"
                    type="button"
                    onClick={onClick}
                />
            </div>
        </section>
    )
}

export default NotFoundPage;