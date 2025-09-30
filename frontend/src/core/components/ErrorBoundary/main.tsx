import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    // You can also log the error to an error reporting service
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex h-screen w-full flex-col items-center justify-center bg-red-50 text-red-700">
            <h1 className="text-2xl font-bold">Something went wrong.</h1>
            <p>We're sorry for the inconvenience. Please try refreshing the page.</p>\n            <button\n              className="mt-4 rounded bg-red-600 px-4 py-2 text-white"\n              onClick={() => window.location.reload()}\n            >\n              Refresh\n            </button>\n          </div>\n        )\n      );\n    }\n\n    return this.props.children;\n  }\n}\n