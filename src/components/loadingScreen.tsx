import React from "react";

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-teal-500" />
      <div className="mt-4 text-xl font-bold text-gray-800">A carregar...</div>
    </div>
  );
};

export default LoadingScreen;