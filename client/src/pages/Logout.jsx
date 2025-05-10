import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../services/authService";
import { MessageContext } from "../contexts/MessageContext";

function Logout() {
  const { showMessage } = useContext(MessageContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
     
      const res = await logout();

      if (res.data.success) {
        showMessage({
          title: "Success",
          text: res.data.message,
          type: "primary",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      showMessage({ title: "Error", text: msg, type: "danger" });
    }
  };

  return (
    <>
      <button className="btn btn-outline-danger" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}
export default Logout;
