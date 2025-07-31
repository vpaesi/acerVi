import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>
          Idealizado e desenvolvido por{' '}
          <a 
            href="https://github.com/vpaesi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="github-link"
          >
            Vitória de Camargo
          </a>
        </p>
        <p className="version-info">Primeira versão (v1.0)</p>
      </div>
    </footer>
  );
};
