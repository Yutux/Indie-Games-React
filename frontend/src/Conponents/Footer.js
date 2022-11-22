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

  function changeEnter(e){
    e.target.style.color = 'black';
    e.target.style.background = 'white';
    e.target.style.textDecoration = 'underline';
  };
  function changeLeave(e){
    e.target.style.color = 'white';
    e.target.style.background = 'none';
    e.target.style.textDecoration = 'none';
  };

  return (
    <div className="footer">
      <div>
        <div  className="footer-content">
          <h3
            style={{
              fontFamily: "Trebuchet MS",
              fontSize: "2em"
            }}
          >
            <em>Indie-</em>Games
          </h3>
          <p>Indie-Games is a registered company under YTIC Tech Pvt. Ltd.</p>
          <div className="sub">
            <div>
              <b>Company</b>
              <p>About</p>
              <p>Blog</p>
              <p><Link onMouseEnter={changeEnter} onMouseLeave={changeLeave} style={{textDecoration: 'none', color: 'white' }} to={"/contactus"}> Contact Us </Link></p>
            </div>
            <div>
              <b>For Gamers</b>
              <p>Code of conduct</p>
              <p>Community</p>
            </div>
            <div>
              <b>For You</b>
              <p><Link onMouseEnter={changeEnter} onMouseLeave={changeLeave} style={{textDecoration: 'none', color: 'white' }} to={"/Term&Condition"}> Terms of service </Link></p>
              <p><Link onMouseEnter={changeEnter} onMouseLeave={changeLeave} style={{textDecoration: 'none', color: 'white' }} to={"/Refund"}> Refund </Link></p>
              <p><Link onMouseEnter={changeEnter} onMouseLeave={changeLeave} style={{textDecoration: 'none', color: 'white' }} to={"/disclaimer"}> Disclaimer </Link></p>
              <p><Link onMouseEnter={changeEnter} onMouseLeave={changeLeave} style={{textDecoration: 'none', color: 'white' }} to={"/PrivacyPolicy"}> Privacy Policy </Link></p>
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