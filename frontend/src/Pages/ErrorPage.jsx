import { useRouteError } from "react-router-dom";
import Footer from "../Components/Footer";
import "../css/ErrorMessage.css"

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="content-holder">
      <div className="errormessage-container">
      <h1 className="errormessage-text">Oops!</h1>
      <p className="errormessage-text">Sorry, an unexpected error has occurred.</p>
      <p className="errormessage-text">
        <i>{error.statusText || error.message}</i>
      </p>
      </div>
      <Footer />
    </div>
  );
};

export default ErrorPage;