export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white text-center px-6">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">The page you are looking for does not exist.</p>

      <a
        href="/"
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition"
      >
        Go Back Home
      </a>
    </div>
  );
}