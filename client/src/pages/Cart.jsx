import { useEffect, useState, useContext } from "react";
import {
  getCart,
  updateCartItem,
  deleteCartItem,
} from "../services/cartService";
import { MessageContext } from "../contexts/MessageContext";
import { useNavigate, Link } from "react-router-dom";
import { handleError } from "../utils/handleError";
import { Trash2 } from "lucide-react";
import { CartContext } from "../contexts/CartContext";
import { addToOrder } from "../services/orderService";
import { clearCart } from "../services/cartService"; 

function Cart() {
  const { cart, setCart, fetchCart } = useContext(CartContext);
  const { showMessage } = useContext(MessageContext);
  const [ order, setOrder] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        await fetchCart();
      } catch (error) {
        handleError(error, showMessage, navigate);
      }
    })();
  }, []);

  const handleMinQ = async (cartItemId) => {
    const item = cart.find((item) => item.id === cartItemId);
    if (!item || item.quantity <= 1) return;

    if (item.quantity <= 1) return;

    try {
      await updateCartItem(cartItemId, item.quantity - 1);
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } catch (error) {
      handleError(error, showMessage, navigate);
    }
  };

  const handleAddQ = async (cartItemId) => {
    const item = cart.find((item) => item.id === cartItemId);
    if (!item) return;

    try {
      await updateCartItem(cartItemId, item.quantity + 1);
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } catch (error) {
      handleError(error, showMessage, navigate);
    }
  };

  const handleDelete = async (cartItemId) => {
    try {
      await deleteCartItem(cartItemId);
      setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
    } catch (error) {
      handleError(error, showMessage, navigate);
    }
  };

  const handlePurchase = async () => {
     try {
       const res = await addToOrder(cart); 
       await clearCart(); 
       setCart([])
       navigate("/orders");
       showMessage({
         title: "Success",
         text: "Order placed!",
         type: "success",
       });
       console.log("res.data", res.data)
     } catch (error) {
      handleError(error, showMessage, navigate);
    }
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 fw-bold">Cart</h1>
      {cart.length > 0 ? (
        <>
          <div className="row">
            <div className="col-md-9">
              {cart.map((item) => {
                return (
                  <div key={item.id} className="mb-3">
                    <div className="card h-100 shadow-sm">
                      <div className="row g-0 align-items-center">
                        <div className="col-auto">
                          <img
                            src={item.Product.image}
                            alt={item.Product.name}
                            width="100"
                            height="100"
                            style={{ objectFit: "cover" }}
                            className="p-2"
                          />
                        </div>
                        <div className="col">
                          <div className="card-body d-flex justify-content-between">
                            <div>
                              <h6 className="card-title">
                                {item.Product.name}
                              </h6>
                              <h6 className="card-text">
                                Price: NT${item.Product.price}
                              </h6>
                            </div>
                            <div className="d-flex align-items-center gap-2 px-4">
                              <button
                                className="btn btn-outline-secondary btn-sm"
                                style={{
                                  width: "32px",
                                  height: "32px",
                                  fontSize: "1rem",
                                  padding: 0,
                                }}
                                onClick={() => handleMinQ(item.id)}
                                disabled={item.quantity <= 1}
                              >
                                -
                              </button>
                              <p
                                className="card-text mb-0 mx-1"
                                style={{ width: "32px", textAlign: "center" }}
                              >
                                {item.quantity}
                              </p>
                              <button
                                className="btn btn-outline-secondary btn-sm"
                                style={{
                                  width: "32px",
                                  height: "32px",
                                  fontSize: "1rem",
                                  padding: 0,
                                }}
                                onClick={() => handleAddQ(item.id)}
                              >
                                +
                              </button>
                              <div
                                className="align-middle ms-2"
                                onClick={() => handleDelete(item.id)}
                              >
                                <Trash2 size={20} className="text-muted" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-md-3">
              <div className="border rounded p-3 shadow-sm">
                <h4 className="mb-4 text-center fw-bold">Summary</h4>
                <div className="d-flex justify-content-between fw-bold fs-6 mb-2 mt-2">
                  <span>Quantity:</span>
                  <span>
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                </div>
                <div className="d-flex justify-content-between fw-bold fs-6 mt-4">
                  <span>Total:</span>
                  <span>
                    NT$
                    {cart
                      .reduce(
                        (acc, item) => acc + item.Product.price * item.quantity,
                        0
                      )
                      .toLocaleString()}
                  </span>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-secondary mt-4 d-block mx-auto w-100"
                  onClick={handlePurchase}
                >
                  Submit Order
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center">Your cart is empty!</div>
      )}

      <div className="text-center mt-5">
        <Link to="/products" className="btn btn-outline-primary">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default Cart;
