

type MessageType = {
    message: string;
    height?: string;
}

const Loader = ({message, height = 'auto'}: MessageType) => {
    return (
        <div className="loading" style={{height: height}}>
            <div className="loading__box">
                <div className="loader"></div>
            </div>
            <span className="loading__message">{message}</span>
        </div>
    )
}

export default Loader;