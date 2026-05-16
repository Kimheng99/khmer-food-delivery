import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowSignin }) => {
  const [menu, setMenu] = useState("home");
  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const { calTotalAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setShowMenu(false);
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        {/* mobile menu icon */}
        <div
          className="menu-icon"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          <i className="fa-solid fa-bars"></i>
        </div>

        <Link to="/" className="logo-link">
          <div className="logo">
            <img src={assets.logo} alt="logo" />
          </div>
        </Link>

        <div className={`navbar-menu ${mobileMenu ? "show-mobile-menu" : ""}`}>
          <ul className="nav">
            <Link
              to="/"
              onClick={() => {
                setMenu("home");
                setMobileMenu(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={menu === "home" ? "active" : ""}
            >
              <span>Home</span>
            </Link>

            <a
              href="#findFood"
              onClick={() => {
                setMenu("menu");
                setMobileMenu(false);
              }}
              className={menu === "menu" ? "active" : ""}
            >
              <span>Menu</span>
            </a>

            <a
              href="#appDownload"
              onClick={() => {
                setMenu("about");
                setMobileMenu(false);
              }}
              className={menu === "about" ? "active" : ""}
            >
              <span>App-Mobile</span>
            </a>

            <a
              href="#footer"
              onClick={() => {
                setMenu("contact");
                setMobileMenu(false);
              }}
              className={menu === "contact" ? "active" : ""}
            >
              <span>Contact</span>
            </a>
            <li className="mobile-cart">
                <Link onClick={()=>setMobileMenu(false)} to="/cart">
                <i className="fa-solid fa-cart-arrow-down"></i> Cart
                </Link>
            </li>
          </ul>
        </div>

        <div className="icon-button">
          <div className="sign-button">
            <div className="shop">
              <Link onClick={()=>window.scrollTo({ top: 0, behavior: "smooth" })} to="/cart">
                <i className="fa-solid fa-cart-arrow-down"></i>
              </Link>
              <div className={calTotalAmount() === 0 ? "" : "cicle"}></div>
            </div>
            

            {!token ? (
              <button
                className="button"
                onClick={() => setShowSignin(true)}
              >
                <p className="text">Login</p>
              </button>
            ) : (
              <div className="user-area">
                <i
                  className="fa-solid fa-circle-user"
                  onClick={() => setShowMenu(!showMenu)}
                ></i>

                {showMenu && (
                  <div className="user-menu">
                    <p
                      onClick={() => {
                        navigate("/my-orders");
                        setShowMenu(false);
                      }}
                    >
                      My Orders
                    </p>
                    <p onClick={handleLogout}>Logout</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;