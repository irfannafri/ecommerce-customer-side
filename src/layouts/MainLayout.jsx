import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
const MainLayout = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex flex-col min-h-screen">
    {/* Navigation Bar */}
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        <ul className="flex space-x-6">
          <li>
            <Link to="/home" className="hover:text-gray-400">Home</Link>
          </li>
          {!isAuthenticated ? (
            <li>
              <Link to="/login" className="hover:text-gray-400">Login</Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/cart" className="hover:text-gray-400">Cart</Link>
              </li>
              <li>
                <Link to="/topup" className="hover:text-gray-400">Top Up</Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-400"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
    <ToastContainer />
    {/* Main Content */}
    <div className="flex-1 bg-gray-100 py-6">
      <div className="container mx-auto px-6">
        <Outlet />
      </div>
    </div>

    {/* Footer */}
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Irfan Store</p>
      </div>
    </footer>
  </div>
  );
};

export default MainLayout;
