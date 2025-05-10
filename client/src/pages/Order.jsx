import { useEffect, useState, useContext } from "react";
import { getOrder } from "../services/orderService";
import { MessageContext } from "../contexts/MessageContext";
import { useNavigate, Link } from "react-router-dom";
import { handleError } from "../utils/handleError";

function Order() {
  const { showMessage } = useContext(MessageContext);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await getOrder();
        const list = res.data.data;
        setOrders(list);
        console.log("list",list);
        console.log("res.data", res.data); // ✅ 看 data
        console.log("res.data.data", res.data.data); 
      } catch (error) {
        handleError(error, showMessage, navigate);
      }
    })();
  }, []);

    const calculateItemTotal = (price, quantity) => {
      return price !== null ? price * quantity : 0;
    };

    const calculateOrderTotal = (orderItems) => {
      return orderItems.reduce((total, item) => {
        return total + calculateItemTotal(item.price, item.quantity);
      }, 0);
    };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 fw-bold">Orders</h1>

      {orders.length > 0 ? (
        <>
          {orders.map((order) => (
            <div key={order.id} className="mb-4">
              <h5 className="mb-3 fw-bold">Order Id #{order.id}</h5>
              <h6 className="mb-3">Status: {order.status}</h6>
              <h6 className="mb-3">
                Order placed at: {new Date(order.createdAt).toLocaleString()}
              </h6>

              {order.OrderItems.map((item) => (
                <div key={item.id} className="card mb-2 shadow-sm">
                  <div className="row g-0 align-items-center">
                    <div className="col">
                      <div className="card-body d-flex justify-content-between">
                        <div className="d-flex gap-3">
                          {item.Product ? (
                            <img
                              src={item.Product.image}
                              alt={item.Product.name}
                              style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <div
                              className="bg-light text-muted d-flex justify-content-center align-items-center"
                              style={{ width: "80px", height: "80px" }}
                            >
                              No Image
                            </div>
                          )}
                          <div>
                            <p className="mb-1">
                              Product:{" "}
                              {item.Product
                                ? item.Product.name
                                : "No longer available"}
                            </p>
                            <p className="mb-1">
                              Price: NT${item.price ?? "N/A"}
                            </p>
                            <p className="mb-0">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="fw-bold align-self-center mb-0">
                          Total: NT$
                          {item.price && item.quantity
                            ? item.price * item.quantity
                            : 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="fw-bold text-end">
                Total Price: NT$ {calculateOrderTotal(order.OrderItems)}
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="text-center">No orders yet!</div>
      )}

      <div className="text-center mt-5">
        <Link to="/products" className="btn btn-outline-primary">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default Order;
