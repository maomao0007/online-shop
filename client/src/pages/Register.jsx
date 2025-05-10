import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom"
import {
  register,
} from "../services/authService";
import Message from "../components/Message";
import { MessageContext } from "../contexts/MessageContext";

function Register() {
  const { showMessage } = useContext(MessageContext);
  const [data, setData] = useState({
    email: "",
    password: ""})
  const navigate = useNavigate()

    const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

   const handleSubmit = async (e) => {
     e.preventDefault();

     try {
       if (!data.email || !data.password)
         throw new Error("Email and Password are required !");

       if (data.password.length < 6) {
         throw new Error("Password must be at least 6 characters");
       }

       const res = await register(data.email, data.password);

       if (res.data.success) {
         showMessage({
           title: "Success",
           text: res.data.message,
           type: "primary",
         });
        setTimeout(() => {
          navigate("/login");
        }, 2000)
       }

     } catch (error) {
       const msg = error.response?.data?.message || error.message;
       showMessage({ title: "Error", text: msg, type: "danger" });
     }
   };

  return (
    <>
      <Message />
      <div className="container min-vh-100 d-flex flex-column align-items-center justify-content-center mt-5">
        <div className="col-11 col-sm-8 col-md-6 col-lg-5 p-4 bg-white rounded shadow">
          <h1 className="text-center mb-4">Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              {/* <label
                htmlFor="email"
                className="form-label d-block text-center fw-semibold"
              >
                Email
              </label> */}
              <input
                type="email"
                className="form-control py-2"
                id="email"
                name="email"
                placeholder="Email"
                value={data.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              {/* <label
                htmlFor="password"
                className="form-label d-block text-center fw-semibold"
              >
                Password
              </label> */}
              <input
                type="password"
                className="form-control py-2"
                id="password"
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>

            <div className="mt-4 text-center">
              <p className="mb-0 text-muted">
                Already have an account? {" "}
                <Link to="/login" className="text-decoration-none">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Register;
