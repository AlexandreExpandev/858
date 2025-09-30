import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * @component ErrorBoundary
 * @summary Catches JavaScript errors anywhere in their child component tree and displays a fallback UI.
 * @domain core
 * @type utility-component
 * @category error-handling
 */
export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Something went wrong.</h1>
            <p>Please try refreshing the page.</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
