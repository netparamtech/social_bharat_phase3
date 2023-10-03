import { useLocation } from "react-router-dom";
import ServerError from "./ServerError";

const ServerErrorTransfer = () => {

    const location = useLocation();
    const errorMessage = location.state && location.state.errorMessage;
    return (
        <div>
            {/* Render ServerError component */}
            {errorMessage && <ServerError errorMessage={errorMessage} />}
        </div>
    );
}

export default ServerErrorTransfer;