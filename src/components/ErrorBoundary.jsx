const ErrorBoundary = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-900">404</h1>
        <p className="text-2xl font-semibold text-gray-600 mb-4">Oops! Page not found.</p>
        <p className="text-gray-500 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
        >
          Go back to Home
        </a>
      </div>
    </div>
  )
}

export default ErrorBoundary