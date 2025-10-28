import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { Button } from "./ui/Button";

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-8 text-center dark:border-red-800 dark:bg-red-900/20">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-red-800 dark:text-red-200">
          Something went wrong
        </h2>
        <p className="mt-2 text-red-600 dark:text-red-300">
          {error.message || "An unexpected error occurred"}
        </p>
      </div>
      <Button onClick={resetErrorBoundary} variant="secondary">
        Try again
      </Button>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{
    error: Error;
    resetErrorBoundary: () => void;
  }>;
}

export default function ErrorBoundary({
  children,
  fallback,
}: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary FallbackComponent={fallback || ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
}
