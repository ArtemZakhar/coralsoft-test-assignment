'use client';

import React, { ErrorInfo } from 'react';

type Props = {
  children: React.ReactNode;
  height?: string;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('ErrorBoundary caught an error: ', { error, errorInfo });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div
          className={`flex flex-col justify-center items-center w-full ${this.props.height ?? 'h-[70vh]'}`}
        >
          <h2 className="text-center text-5xl">Oh, si è verificato un errore 🙁</h2>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-48"
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
          >
            Vuoi riprovare?
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
