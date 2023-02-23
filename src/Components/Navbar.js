import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <>
      <div className="Navbar">
        <h1 className="NavHeadingText">Bolo</h1>
        
      </div>

      <label class="hamburger-menu">
          <input type="checkbox" />
        </label>
      {/* <aside class="sidebar">
      <nav>
        <div>This</div>
        <div>Is</div>
        <div>The</div>
        <div>Sidebar</div>
      </nav>
    </aside> */}

      {/* <aside className="sidebar"> */}
        <div className="sidebar-menu">
          <Link to="/record">
            <div className="sidebar-menu-option">
              <p className="sidebar-menu-option-text">Record</p>
            </div>
          </Link>
          {user === null ? (
            <Link to="/login">
              <div className="sidebar-menu-option">
                <p className="sidebar-menu-option-text">Login</p>
              </div>
            </Link>
          ) : (
            <Link to="/dashboard">
              <div className="sidebar-menu-option">
                <p className="sidebar-menu-option-text">{user.name}</p>
              </div>
            </Link>
          )}
          {user !== null && (
            <Link to="/dashboard">
              <div className="sidebar-menu-option">
                <p className="sidebar-menu-option-text" onClick={onLogout}>
                  Logout
                </p>
              </div>
            </Link>
          )}
        </div>
      {/* </aside> */}
    </>
  );
};

export default Navbar;
