import App from '../App';

jest.mock('../pages/Home', () => {
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
    const component = App;
    expect(typeof component).toBe('function');
    expect(component.length).toBe(0);
  });

  it('should have default export', () => {
    expect(App).toBeTruthy();
  });

  it('should be importable as default export', () => {
    expect(App).not.toBeNull();
    expect(App).not.toBeUndefined();
  });
});
