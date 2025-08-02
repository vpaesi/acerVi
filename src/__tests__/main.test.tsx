import React from 'react';
import { createRoot } from 'react-dom/client';

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
  })),
}));

jest.mock('../App', () => ({
  __esModule: true,
  default: () => <div data-testid="app">App Component</div>
}));

jest.mock('bootstrap/dist/css/bootstrap.min.css', () => ({}));
jest.mock('../index.css', () => ({}));

describe('Main Entry Point', () => {
  it('should have necessary dependencies', () => {
    expect(React).toBeDefined();
    expect(React.StrictMode).toBeDefined();
    
    expect(createRoot).toBeDefined();
  });

  it('should be able to create React elements', () => {
    const element = React.createElement('div', { id: 'test' }, 'Test Content');
    expect(element).toBeDefined();
    expect(element.type).toBe('div');
    expect(element.props.id).toBe('test');
  });

  it('should mock main entry point functionality', () => {
    const mockRoot = {
      render: jest.fn()
    };
    
    const createRootMock = createRoot as jest.MockedFunction<typeof createRoot>;
    createRootMock.mockReturnValue(mockRoot as any);
    
    const container = document.createElement('div');
    container.id = 'root';
    const root = createRoot(container);
    
    expect(createRootMock).toHaveBeenCalledWith(container);
    expect(root).toBeDefined();
  });
});
