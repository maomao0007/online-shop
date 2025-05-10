import { useEffect, useState, useContext } from "react";
import { getProfile } from "../services/authService";
import { MessageContext } from "../contexts/MessageContext";
import { useNavigate, Link } from "react-router-dom";
import { User } from "lucide-react";
import { handleError } from "../utils/handleError";

function Profile() {
  const [profile, setProfile] = useState({});
  const { showMessage } = useContext(MessageContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await getProfile();
        const info = res.data.data;
        setProfile(info);
      } catch (error) {
        handleError(error, showMessage, navigate);
      }
    })();
  }, []);

  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h1 className="text-center m-5 fw-bold">Account</h1>
        {profile ? (
          <div className="text-center mt-4">
            <User size={28} className="align-middle text-secondary me-2" />
            <span className="h5 align-middle text-muted">{profile.email}</span>
          </div>
        ) : (
          <p className="text-center">Loading...</p>
        )}
        <div className="text-center mt-5">
          <Link to="/products" className="btn btn-outline-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    </>
  );
}
export default Profile;
