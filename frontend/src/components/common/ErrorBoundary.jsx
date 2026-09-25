import React from "react";
import { Link } from "react-router-dom";

/**
 * ErrorBoundary Component for catching runtime errors gracefully.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="card !bg-white p-12 text-center space-y-4 max-w-xl mx-auto my-12 shadow-card">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 mx-auto">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-bold text-forest-dark">
            Something Went Wrong
          </h2>
          <p className="text-sm text-ink/60 leading-relaxed max-w-md mx-auto">
            An unexpected error occurred while rendering this page. You can return to the dashboard or refresh.
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => this.setState({ hasError: false, error: null })}
              className="btn-secondary !px-5"
            >
              Try Again
            </button>
            <Link to="/donor/dashboard" className="btn-primary !px-5">
              Go to Dashboard
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
