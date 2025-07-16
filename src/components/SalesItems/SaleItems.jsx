import React from 'react';
import './SaleItems.scss';
import { useCart } from '../Cart/CartContext';
import Section from '../Section/Section';

const items = [
  {
    id: 1,
    discount: '-50%',
    image: '/11.png',
    title: 'Decorative forged bridge',
    newPrice: 500,
    oldPrice: 1000,
  },
  {
    id: 2,
    discount: '-34%',
    image: '/12.png',
    title: 'Flower basket',
    newPrice: 100,
    oldPrice: 150,
  },
  {
    id: 3,
    discount: '-25%',
    image: '/13.png',
    title: 'Aquarium lock',
    newPrice: 150,
    oldPrice: 200,
  },
  {
    id: 4,
    discount: '-17%',
    image: '/14.png',
    title: 'Secateurs',
    newPrice: 199,
    oldPrice: 240,
  },
];

const SaleItems = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (item, e) => {
    e.stopPropagation();
    addToCart({ ...item, quantity: 1 });
  };

  return (
    <Section title={"Products"}>
        {items.map((item) => (
            <div className="item-card" key={item.id}>
              <div className="discount-badge">{item.discount}</div>
              <div className="icon-bar">
                <button
                  className="icon-btn"
                  title="Zum Warenkorb"
                  onClick={(e) => handleAddToCart(item, e)}
                  type="button"
                >
                  <img src="/basket=empty.svg" alt="Cart" className="icon" />
                </button>
                <img src="/basket=heart empty.svg" alt="Like" className="icon" />
              </div>
              <img src={item.image} alt={item.title} className="item-image" />
              <div className="item-text">{item.title}</div>
              <div className="item-prices">
                <span className="new-price">${item.newPrice}</span>
                <span className="old-price">${item.oldPrice}</span>
              </div>
            </div>
          ))}
    </Section>
  );
};

export default SaleItems;
