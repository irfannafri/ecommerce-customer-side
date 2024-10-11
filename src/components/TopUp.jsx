import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const TopUp = () => {
  const [provider, setProvider] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate(); // 

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(`Top-up Rp${amount} to ${phoneNumber} successful!`);
    navigate('/');
  };

  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Prepaid Credit Top-up</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="provider" className="block text-sm font-medium text-gray-700">
              Provider
            </label>
            <select
              id="provider"
              name="provider"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">-- Choose Provider --</option>
              <option value="Telkomsel">Telkomsel</option>
              <option value="Indosat">Indosat</option>
              <option value="XL">XL</option>
              <option value="Tri">Tri</option>
              <option value="Smartfren">Smartfren</option>
              <option value="Axis">Axis</option>
            </select>
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="08xxxxxxxxxx"
              required
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <select
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">-- Amount --</option>
              <option value="5000">Rp5.000</option>
              <option value="10000">Rp10.000</option>
              <option value="25000">Rp25.000</option>
              <option value="50000">Rp50.000</option>
              <option value="100000">Rp100.000</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Top-up Sekarang
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TopUp