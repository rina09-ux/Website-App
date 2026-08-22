import {StrictMode, Component, type ReactNode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

class ErrorBoundary extends Component<{children: ReactNode}, {error: Error | null}> {
  state = {error: null as Error | null};

  static getDerivedStateFromError(error: Error) {
    return {error};
  }

  componentDidCatch(error: Error, info: {componentStack: string}) {
    // Surface the real cause in the browser console instead of a silent blank page.
    console.error('NusaSec app crashed:', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          fontFamily: 'monospace',
          padding: '2rem',
          maxWidth: '640px',
          margin: '0 auto',
          color: '#e2e8f0',
          background: '#020617',
          minHeight: '100vh',
        }}>
          <h1 style={{fontSize: '1.25rem', marginBottom: '1rem'}}>Something went wrong</h1>
          <p style={{marginBottom: '1rem'}}>
            The app hit an error while rendering. Open the browser console (F12) for the full stack trace.
          </p>
          <pre style={{whiteSpace: 'pre-wrap', color: '#f87171'}}>{this.state.error.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
