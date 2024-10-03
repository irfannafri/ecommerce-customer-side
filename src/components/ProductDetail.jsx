import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addToCart } from "../store/cartSlice";
import { fetchProductById } from "../store/productSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, status } = useSelector((state) => state.products);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login"); 
    } else {
      dispatch(addToCart({ ...product, quantity }));
    }
  };

  if (status === "loading") {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center text-red-500">Product not found.</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row items-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-64 h-64 object-contain mb-8 md:mb-0 md:mr-8"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold mb-4">Price: ${product.price}</p>
          <div className="flex items-center mb-4">
            <label htmlFor="quantity" className="mr-2 font-semibold">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              min="1"
              className="border rounded-md px-2 py-1 w-20 text-center"
            />
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
