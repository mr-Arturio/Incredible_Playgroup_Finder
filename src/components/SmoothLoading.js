import React from "react";

export function SmoothLoadingSpinner({ size = "md", className = "" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} text-blue-600 animate-spin`}
        style={{
          animation: "spin 1s linear infinite",
        }}
      >
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    </div>
  );
}

export function SmoothLoadingOverlay({ isVisible, children }) {
  if (!isVisible) return <>{children}</>;

  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
        <SmoothLoadingSpinner size="lg" />
      </div>
    </div>
  );
}

export function SmoothLoadingIndicator({
  loading,
  message = "Updating results...",
}) {
  if (!loading) return null;

  return (
    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2 animate-fade-in">
      <SmoothLoadingSpinner size="sm" />
      <span className="text-blue-800 text-sm">{message}</span>
    </div>
  );
}
