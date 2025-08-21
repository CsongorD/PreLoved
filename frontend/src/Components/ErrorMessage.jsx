import "../css/ErrorMessage.css"
import {useNavigate} from "react-router-dom";

function ErrorMessage({ text, setError }) {

    const navigate = useNavigate();

    return (
        <div className="content-holder">
            <div className="errormessage-container">
                <h2 className="errormessage-text">  Sorry, an error has occured: </h2>
                <h2 className="errormessage-text">   {text}</h2>
                <button className="button" onClick={() => setError(null)}>Cancel</button>
            </div>
        </div>
    );
}

export default ErrorMessage;
