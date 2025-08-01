// Testes simples para App.tsx
import App from './App';

// Mock do componente Home para evitar dependências complexas
jest.mock('./pages/Home', () => {
  return function MockHome() {
    return 'Mocked Home Component';
  };
});

describe('App Component', () => {
  it('should be defined and importable', () => {
    expect(App).toBeDefined();
    expect(typeof App).toBe('function');
  });

  it('should have correct display name', () => {
    expect(App.name).toBe('App');
  });

  it('should be a React functional component', () => {
    // Testa se é uma função que pode ser um componente React
    const component = App;
    expect(typeof component).toBe('function');
    expect(component.length).toBe(0); // FC não recebe argumentos além de props
  });

  it('should have default export', () => {
    // Testa se o export default funciona
    expect(App).toBeTruthy();
  });
});
