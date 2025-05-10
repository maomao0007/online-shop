import { useEffect, useState, useContext } from "react";
import { getProducts } from "../services/productServices";
import { addToCart } from "../services/cartService";
import Message from "../components/Message";
import { MessageContext } from "../contexts/MessageContext";
import { useNavigate, Link } from "react-router-dom";
import { handleError } from "../utils/handleError";
import { CartContext } from "../contexts/CartContext";

function Products() {
  const { showMessage } = useContext(MessageContext);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { setCart } = useContext(CartContext);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await getProducts();
        const productsData = res.data.data;
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        handleError(error, showMessage, navigate);
      }
    })();
  }, []);

  useEffect(() => {
    if (!products.length) return;

    const timer = setTimeout(() => {

      let filtered = [...products];

      if (category !== "") {
        filtered = filtered.filter((p) => p.category === category);
      }

      if (searchTerm.trim() !== "") {
        filtered = filtered.filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      setFilteredProducts(filtered);

      const uniqueCategories = [...new Set(products.map((p) => p.category))];
      setCategories(uniqueCategories);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, products, category]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    
  };

  const handleCart = async (id) => {
    try {
      const item = products.find((p) => p.id === id);
      const res = await addToCart({ product_id: item.id, quantity: 1 });
      setCart(res.data.data);
      showMessage({
        title: "Success",
        text: "Added to cart!",
        type: "success",
      });
      console.log("res.data", res.data);
      console.log("item", item);
    } catch (error) {
      handleError(error, showMessage);
    }
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <>
      <div className="container py-5">
        <h1 className="text-center mb-5 fw-bold">Products</h1>

        <input
          className="form-control w-md-50 w-100 mb-3 mx-auto"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />

        <select
          className="form-control w-md-50 w-100 mb-5 mx-auto"
          value={category}
          onChange={handleCategory}
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {filteredProducts.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {filteredProducts.map((product) => (
              <div className="col" key={product.id}>
                <div className="card h-100 shadow card-hover">
                  <img
                    src={product.image}
                    className="card-img-top img-fluid"
                    alt={product.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="mt-auto text-black fw-light">
                      {" "}
                      NT${product.price}
                    </p>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => handleCart(product.id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No products found for this keyword.</p>
        )}
      </div>
    </>
  );
}

export default Products;
