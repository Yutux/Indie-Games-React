import React from "react";
import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillApple
} from "react-icons/ai";
import { FaGooglePlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../index.css";

export const Footer = () => {

  return (
    <div className="footer" >
      <div>
        <div  className="footer-content">
          <h3
            style={{
              fontFamily: "Trebuchet MS",
              fontSize: "2em"
            }}
          >
            <em>Indies-</em>Games
          </h3>
          <p>Indie-Games is a registered company under YTIC Tech Pvt. Ltd.</p>
          <div className="sub">
            <div>
              <b>Company</b>
              <p>About</p>
              <p>Blog</p>
              <p><Link className="links" to={"/contactus"}> Contact Us </Link></p>
            </div>
            <div>
              <b>For Gamers</b>
              <p>Code of conduct</p>
              <p>Community</p>
            </div>
            <div>
              <b>For You</b>
              <p><Link className="links"  to={"/Term&Condition"}> Terms of service </Link></p>
              <p><Link className="links" to={"/Refund"}> Refund </Link></p>
              <p><Link className="links" to={"/disclaimer"}> Disclaimer </Link></p>
              <p><Link className="links" to={"/PrivacyPolicy"}> Privacy Policy </Link></p>
            </div>
            <div>
              <b>Social links</b>
              <div>
                <AiFillFacebook />
                <AiFillTwitterCircle />
                <AiFillInstagram />
              </div>
              <div>
                <AiFillApple />
                <FaGooglePlay />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};