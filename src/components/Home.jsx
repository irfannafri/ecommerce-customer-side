import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import { addToCart } from "../store/cartSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.products.items);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(addToCart({ ...product, quantity: 1 }));
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Products</h1>

      {status === "loading" && (
        <p className="text-center text-gray-500">Loading...</p>
      )}
      {status === "failed" && (
        <p className="text-center text-red-500">Error fetching products.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow-lg p-4 flex flex-col items-center"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-32 h-32 object-contain mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-center">
              {product.title}
            </h3>
            <p className="text-gray-600 mb-4">Price: ${product.price}</p>
            <Link to={`/product/${product.id}`}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-2">
                View Details
              </button>
            </Link>
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
