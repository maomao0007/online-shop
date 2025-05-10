import { Routes, Route} from "react-router-dom"
import Register from "./pages/Register"
import Login from './pages/Login'
import Products from './pages/Products'
import Header from './pages/Header'
import Footer from './pages/Footer'
import NotFound from "./pages/NotFound"
import Profile from "./pages/Profile"
import Cart from "./pages/Cart"
import Message from "./components/Message";
import ScrollButton from "./components/ScrollButton";
import ProtectedRoute from './components/ProtectedRoute'
import Order from "./pages/Order"

function App() {

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <Message />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>

            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Order />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <ScrollButton />
    </>
  );
}

export default App
