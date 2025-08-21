import logo from "../Images/prelovedlogo.png";
import twitterLogo from "../Images/twitter.svg"
import facebookLogo from "../Images/facebook.svg"
import instagramLogo from "../Images/instagram.svg"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../css/Header.css";
import { useClient } from "../Context/ClientContext";

const Header = () => {

  const navigate = useNavigate();
  const { client, login } = useClient();

  const logout = () => {
    localStorage.setItem("Token", "");
    login(null);
  }


  return (
    <header className="header">
      <div className="headerDiv">
        <div className='logoContainer'>
          <img className="picture" src={logo} alt='logo'></img>
          <img className="picture" src={twitterLogo} alt='twitter logo'></img>
          <img className="picture" src={facebookLogo} alt='facebook logo'></img>
          <img className="picture" src={instagramLogo} alt='instagram logo'></img>
        </div>
        <div className="buttonContainer" id="headerButtonContainer">
          {client && <button className='button' onClick={() => navigate("/newproduct")}>Add new product</button>}
          {!client && <button className='button' onClick={() => navigate("/landing")}>Login/Sign up</button>}
          {client && <button className='button' onClick={() => logout()}>Log Out</button>}

        </div>
      </div>
    </header>
  )
}

export default Header;