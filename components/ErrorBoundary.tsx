import React, { ErrorInfo, ReactNode, useState } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [errorInfo, setErrorInfo] = useState<ErrorInfo | null>(null);

  const componentDidCatch = (error: Error, errorInfo: ErrorInfo) => {
    setHasError(true);
    setError(error);
    setErrorInfo(errorInfo);
    // You can also log the error to an error reporting service here
  };

  if (hasError) {
    // You can customize the error UI here
    return (
      <div className="bg-red-500 text-white p-4">
        <h1 className="text-2xl font-bold">Something went wrong.</h1>
        <p className="text-lg">{error?.toString()}</p>
        <p className="text-sm">{errorInfo?.componentStack}</p>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;
