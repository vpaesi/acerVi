import React, { useState, useEffect } from 'react';

export default function App(): JSX.Element | null {
  const [Home, setHome] = useState<React.ComponentType<object> | null>(null);

  useEffect(() => {
    // import da Home só quando o componente for renderizado,
    // assim os testes que apenas importam App não carregam Home (permite jest.mock funcionar)
    import('./pages/Home').then((module) => {
      setHome(() => module.default);
    });
  }, []);

  return Home ? <Home /> : null;
}
