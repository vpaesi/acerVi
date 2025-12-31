import React, { useState, useEffect } from 'react';

let HomeSync: React.ComponentType<object> | null = null;

export default function App(): JSX.Element | null {
  const [Home, setHome] = useState<React.ComponentType<object> | null>(HomeSync);

  useEffect(() => {
    import('./pages/Home').then((module) => {
      HomeSync = module.default;
      setHome(() => module.default);
    });
  }, []);

  return Home ? <Home /> : null;
}
