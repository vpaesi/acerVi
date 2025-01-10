import React, { useEffect, useState } from 'react';
import { getBooksBySubject } from '../services/readapi';

interface Book {
  id: number;
  coverLink: string;
  entryMain: string[];
  titleMain: string;
}

interface CarouselProps {
  subject: string;
}

const Carousel: React.FC<CarouselProps> = ({ subject }) => {
  const [items, setItems] = useState<Book[]>([]);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBooksBySubject(subject);
        setItems(data);
        setVisibleItems(
          data.map((_, index) => index).slice(0, Math.min(data.length, 5))
        );
      } catch (error) {
        console.error('Erro ao search itens do carrossel:', error);
        setItems([]);
      }
    };

    fetchData();
  }, [subject]);

  useEffect(() => {
    if (items.length < 2) return;

    const interval = setInterval(() => {
      setVisibleItems((prev) => {
        const nextVisible = [...prev];
        nextVisible.shift();
        nextVisible.push((prev[prev.length - 1] + 1) % items.length);
        return nextVisible;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [items]);

  if (!items.length) {
    return null;
  }

  return (
    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {visibleItems.map((index, i) => (
          <div
            className={`carousel-item ${i === 0 ? 'active' : ''}`}
            key={items[index].id}
          >
            <img
              src={items[index].coverLink}
              className="d-block w-100 img-fluid"
              alt={`Capa do book ${items[index].titleMain}`}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>{items[index].titleMain}</h5>
              <p>{items[index].entryMain.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
      {items.length > 1 && (
        <>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Próximo</span>
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
