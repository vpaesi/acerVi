import React from 'react';
import { createRoot } from 'react-dom/client';

// Mock do React DOM
jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
  })),
}));

// Mock do App component
jest.mock('./App', () => ({
  __esModule: true,
  default: () => <div data-testid="app">App Component</div>
}));

// Mock dos CSS imports
jest.mock('bootstrap/dist/css/bootstrap.min.css', () => ({}));
jest.mock('./index.css', () => ({}));

describe('Main Entry Point', () => {
  it('should have necessary dependencies', () => {
    // Verifica se React está disponível
    expect(React).toBeDefined();
    expect(React.StrictMode).toBeDefined();
    
    // Verifica se createRoot está disponível (mockado)
    expect(createRoot).toBeDefined();
  });

  it('should be able to create React elements', () => {
    const element = React.createElement('div', { id: 'test' }, 'Test Content');
    expect(element).toBeDefined();
    expect(element.type).toBe('div');
    expect(element.props.id).toBe('test');
  });
});
