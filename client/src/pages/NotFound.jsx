import { Link } from "react-router-dom";
import { Ban } from "lucide-react";

const NotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="d-flex align-items-center justify-content-center mt-5">
        <Ban size={60} className="text-danger me-3" />
        <h1 className="fw-bold display-1 mb-4">404</h1>
      </div>
      <h2 className="h4 text-muted mt-3">Page Not Found</h2>
      <div className="text-center mt-5">
        <Link to="/products" className="btn btn-outline-primary">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
