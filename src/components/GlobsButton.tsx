import type {JSX, ButtonHTMLAttributes} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    background?: string;
}

function GlobsButton({label, background = "#f00", ...props}: ButtonProps): JSX.Element {
    return (
        <button
            style={{backgroundColor: background}}
            {...props}
        >
            {label}
        </button>
    )
}

export default GlobsButton;