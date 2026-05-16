import React, { useState } from 'react'
import './SignIn.css'
import { assets } from '../../assets/assets'
import Swal from "sweetalert2";
import { StoreContext } from "../../context/StoreContext";
import { useContext } from 'react';

const SignIn = ({ setShowSignin }) => {
  
  const [current, setCurrent] = useState("Login");
  const { setToken, BASE_URL } = useContext(StoreContext)
  const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: ""
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
        e.preventDefault();

        const url =
          current === "Login"
            ? `${BASE_URL}/auth/login`
            : `${BASE_URL}/auth/register`;

        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (data.token) {
          

          setToken(data.token);
          Swal.fire({
            icon: "success",
            title: current === "Login" ? "Login Success 🎉" : "Register Success 🎉",
            showConfirmButton: false,
            timer: 1500
          });

          
          setShowSignin(false);
        } else {
          
          Swal.fire({
            icon: "error",
            title: data.message || "Something went wrong"
          });
        }
      };

  return (
    <div className="sign-in">
      <div className="sign-in-container">
        <div className="sign-in-header">
          <h2>{current}</h2>
          <img
            src={assets.cross_icon}
            alt="close"
            onClick={() => setShowSignin(false)}
          />
        </div>

        <form className="sign-in-form" onSubmit={handleSubmit}>
          {current !== "Login" && (
            <input
              type="text"
              name="name"
              placeholder="Input Your name"
              required
              onChange={handleChange}
            />
            )}
            <input
                type="email"
                name="email"
                placeholder="Input Your email"
                required
                onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />
            <button type="submit">
              {current === "Login" ? "Login" : "Create Account"}
            </button>

          <div className="sign-in-terms">
            <input type="checkbox" required />
            <p>
              By continuing, I agree to the terms of use & privacy policy.
            </p>
          </div>

          <p className="sign-in-footer">
              {current === "Login" ? (
                <>
                  Create a new account?{" "}
                  <span onClick={() => setCurrent("Sign up")}>Click here</span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span onClick={() => setCurrent("Login")}>Login here</span>
                </>
              )}
            </p>
        </form>
      </div>
    </div>
  )
}

export default SignIn
