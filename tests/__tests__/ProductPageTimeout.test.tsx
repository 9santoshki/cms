import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';

// Increase test timeout for timeout testing
jest.setTimeout(30000); // Max timeout for tests

// Test component for timeout functionality
const TimeoutComponent = () => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    const fetchData = async () => {
      // Simulate timeout for testing purposes
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second timeout for testing
      
      setData('Test Data Loaded');
      setLoading(false);
    };
    
    fetchData();
  }, []);
  
  if (loading) {
    return <div data-testid="loading">Loading...</div>;
  }
  
  return <div data-testid="data-loaded">{data}</div>;
};

describe('Timeout Functionality', () => {
  test('should handle timeout properly', async () => {
    // Render the component with timeout
    render(<TimeoutComponent />);

    // Initially expect loading state
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for the timeout to complete (2000ms timeout)
    await waitFor(() => {
      expect(screen.getByTestId('data-loaded')).toBeInTheDocument();
    }, {
      timeout: 5000 // Wait up to 5 seconds for the timeout to complete
    });

    // Verify the data is loaded after timeout
    expect(screen.getByText('Test Data Loaded')).toBeInTheDocument();
  });
});