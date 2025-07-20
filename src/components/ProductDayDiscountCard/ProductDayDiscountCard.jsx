import React, { useEffect, useState } from 'react';
import './ProductDayDiscountCard.scss';
import { BASE_BACKEND_URL } from '../../utils/env'; 
import { Heart } from 'lucide-react';
import { useCart } from '../Cart/CartContext'; // подключаем контекст

const getSeededRandomIndex = (seed, max) => seed % max;

const ProductDayDiscountCard = ({ products }) => {
  const [product, setProduct] = useState(null);
  const [date, setDate] = useState(null);
  const { addToCart } = useCart(); // берем addToCart из контекста

  useEffect(() => {
    if (products && products.length > 0) {
      const today = new Date().toISOString().split('T')[0];
      setDate(today);
      const saved = JSON.parse(localStorage.getItem('productOfTheDay'));

      if (saved?.date === today) {
        setProduct(saved.product);
      } else {
        const seed = new Date(today).getTime();
        const randomIndex = getSeededRandomIndex(seed, products.length);
        const selectedProduct = products[randomIndex];
        localStorage.setItem(
          'productOfTheDay',
          JSON.stringify({ date: today, product: selectedProduct })
        );
        setProduct(selectedProduct);
      }
    }
  }, [products]);

  if (!product) return null;

  const { image, title, price } = product;
  const discountPrice = (price / 2).toFixed(2);
  const imageUrl = `${BASE_BACKEND_URL}${image}`;

  const handleAddToCart = () => {
    const discountedProduct = {
      ...product,
      price: Number(discountPrice),
    };
    addToCart(discountedProduct);
    console.log('Товар добавлен в корзину (контекст):', discountedProduct);
  };

  return (
    <div className="product-of-day-card">
      <div className="cardImageWrapper">
        <img src={imageUrl} className="productImage" alt={title} />
        <div className="discountChip">−50%</div>
        <button className="heartBtn">
          <Heart />
        </button>
      </div>

      <div className="cardDetails">
        <h3 className="productTitle">{title}</h3>
        <div className="priceContainer">
          <div className="priceWrapper">
            <p className="discontPrice">${discountPrice}</p>
            <p className="originalPrice">${price}</p>
          </div>
        </div>
        <div className="buttonWrapper">
          <button onClick={handleAddToCart} className="addToCart" type="button">
            Add to Cart
          </button>
        </div>
        {date && (
          <p className="productDate">🗓️ One Day Offer for {new Date(date).toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</p>
        )}
      </div>
    </div>
  );
};

export default ProductDayDiscountCard;
