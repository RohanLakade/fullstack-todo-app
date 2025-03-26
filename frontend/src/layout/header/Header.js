// React & Third-Party Libraries Imports
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUser, FaUserCircle } from "react-icons/fa";

// Project Utilities & API Helpers Imports
import { useAuth } from "@context/AuthContext";
import { logoutUser } from "@utils/api/authService";
import { clearFromLocalStorage } from "@utils/helpers/helpers";

// Component Styles Imports
import "./Header.scss";

const Header = ({ PageTitle }) => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const dropdownRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const result = await logoutUser(); // handle user logout

      clearFromLocalStorage("accessToken"); // Remove tokens from local storage
      clearFromLocalStorage("user"); // Remove user data from local storage

      setUser(null);
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <div className="header">
      <h2>{PageTitle}</h2>
      <div className={"profile-wrapper"} ref={dropdownRef}>
        <span className="user">{user?.fullName}</span>
        <button
          className={"profile-options-btn"}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="User Profile"
        >
          <FaUserCircle className="icon" size={40} />
        </button>
        {isOpen && (
          <ul className={"dropdown"}>
            {/* <Link to={"/profile"}> */}
            <li>
              <FaUser className={"icon"} />
              <span>Profile</span>
            </li>
            {/* </Link> */}
            <li onClick={handleLogout}>
              <FaSignOutAlt className={"icon"} />
              <span>Logout</span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Header;
