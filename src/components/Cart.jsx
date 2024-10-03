import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { updateQuantity, removeFromCart, clearCart } from '../store/cartSlice';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quantities, setQuantities] = useState(cartItems.map(item => item.quantity));

  const handleQuantityChange = (e, index, item) => {
    const newQuantities = [...quantities];
    newQuantities[index] = parseInt(e.target.value, 10);
    setQuantities(newQuantities);
    dispatch(updateQuantity({ id: item.id, quantity: newQuantities[index] }));
  };


  const handleCheckout = () => {
    const isValid = cartItems.every((item) => item.quantity <= 20);
    if (!isValid) {
      toast.error('Quantity tidak terpenuhi');
    } else {
      toast.success('Checkout successful!');
      dispatch(clearCart());
      navigate('/');
    }
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item.id));
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h2 className="text-3xl font-semibold mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cartItems.map((item, index) => (
              <li key={item.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-500">${item.price} each</p>
                  <input
                    type="number"
                    min="1"
                    value={quantities[index]}
                    onChange={(e) => handleQuantityChange(e, index, item)}
                    className="mt-2 p-1 border border-gray-300 rounded-md w-20"
                  />
                </div>
                <div className="flex items-center">
                  <span className="mr-6">${item.price * item.quantity}</span>
                  <button
                    onClick={() => handleRemoveItem(item)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex justify-between items-center">
            <h3 className="text-2xl font-semibold">Total: ${totalAmount.toFixed(2)}</h3>
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
