import React from 'react';

type Props = {
  fallback: (error: Error | null) => React.ReactNode;
  children: React.ReactNode;
}

type State = {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, _: React.ErrorInfo): void {
    this.setState({ error });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback(this.state.error);
    }
    return this.props.children;
  }
}
