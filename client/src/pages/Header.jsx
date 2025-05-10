import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import {
  Shirt,
  User,
  ShoppingCart,
  ClipboardList, LogOut,
} from "lucide-react";
import logo from "../assets/logo.png";
import { CartContext } from "../contexts/CartContext";
import { MessageContext } from "../contexts/MessageContext";

function Header() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { cart, setCart } = useContext(CartContext);
  const { showMessage } = useContext(MessageContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setCart([]);
      navigate("/login");
    } catch (error) {
      showMessage({ type: "danger", text: "Logout failed. Please try again." });
    }
  };

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLinkClick = () => {
    setIsCollapsed(true);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top shadow-sm">
      <div className="container-fluid">
        <Link to="/products" className="navbar-brand">
          <img
            src={logo}
            alt="Logo"
            style={{ height: "40px", width: "auto" }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isCollapsed ? "" : "show"}`}
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/products"
                className="nav-link active text-center"
                aria-current="page"
                onClick={handleLinkClick}
              >
                <Shirt size={22} className="align-middle me-2" />
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/profile"
                className="nav-link text-center"
                onClick={handleLinkClick}
              >
                <User size={22} className="align-middle me-2" />
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/cart"
                className="nav-link text-center"
                onClick={handleLinkClick}
              >
                <div className="position-relative d-inline-block">
                  <ShoppingCart size={22} className="align-middle me-2" />
                  {/* {cart.length > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: "0.6rem" }}
                    >
                      {cart.length}
                    </span>
                  )} */}
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/orders"
                className="nav-link text-center"
                onClick={handleLinkClick}
              >
                <ClipboardList size={22} className="align-middle me-2" />
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item d-flex justify-content-center">
              <button
                className="nav-link text-center btn btn-link p-0 d-flex align-items-center justify-content-center"
                onClick={handleLogout}
                style={{ textDecoration: "none" }}
              >
                {isCollapsed ? (
                  <LogOut size={22} className="align-middle me-4" />
                ) : (
                  <LogOut size={22} className="align-middle mt-2 me-1" />
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Header;
