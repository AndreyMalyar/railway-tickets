import type {JSX} from "react";

interface ButtonProps {
    label: string;
    background?: string;
}

function GlobsButton({label, background = "#f00"}: ButtonProps): JSX.Element {
    return <button style={{backgroundColor: background}}>{label}</button>
}
export default GlobsButton;