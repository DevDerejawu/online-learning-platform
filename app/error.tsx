"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white text-center px-6">
      <h1 className="text-5xl font-bold mb-4">Something went wrong</h1>
      <p className="mb-6 text-gray-400">
        An unexpected error occurred.
      </p>

      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-red-600 hover:bg-red-500 rounded-lg transition"
      >
        Try Again
      </button>
    </div>
  );
}