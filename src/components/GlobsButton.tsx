import type {JSX, ButtonHTMLAttributes} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className: string;
    label: string;
}

function GlobsButton({className, label, ...props}: ButtonProps): JSX.Element {
    return (
        <button
            className={className}
            {...props}
        >
            {label}
        </button>
    )
}

export default GlobsButton;