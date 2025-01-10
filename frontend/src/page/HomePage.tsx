import React from 'react';
import Carousel from '../components/Carousel';

const HomePage: React.FC = () => {
  const subjects = [
    'DESENVOLVIMENTO_PESSOAL', 
    'FANTASIA', 
    'FICCAO', 
    'FICCAO_CIENTIFICA', 
    'FICCAO_INFANTO_JUVENIL', 
    'ROMANCE', 
    'SUSPENSE_MISTERIO'
  ];

  return (
    <div>
      <article className="container">
      {subjects.map((subject) => (
        <Carousel key={subject} subject={subject} />
      ))}
      </article>
    </div>
  );
};

export default HomePage;
