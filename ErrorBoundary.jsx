import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('App crashed:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="container" style={{ paddingTop: '2rem' }}>
          <section className="card">
            <h2>Something broke in the page content</h2>
            <p>
              This usually means a typo was introduced while editing text values.
              Fix the last edit in <strong>content.js</strong> and refresh.
            </p>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
