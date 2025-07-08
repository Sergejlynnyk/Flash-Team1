
import { useParams } from 'react-router-dom';
import './ProductDetails.scss';
import { useState } from 'react';

const items = [
  {
    id: 1,
    image: "/14.png",
    alt: "Secateurs",
    text: "Secateurs",
    discount: 17,
    newPrice: 199,
    oldPrice: 240,
  },
  {
    id: 2,
    image: "/img-22.png",
    alt: "Collection for berries (plastic)",
    text: "Collection for berries (plastic)",
    discount: 26,
    newPrice: 26,
    oldPrice: 35,
  },
  {
    id: 3,
    image: "/img-34.png",
    alt: "Gloves (black)",
    text: "Gloves (black)",
    discount: 36,
    newPrice: 9,
    oldPrice: 14,
  },
  {
    id: 4,
    image: "/img-44.png",
    alt: "Watering Can",
    text: "Watering Can",
    discount: 18,
    newPrice: 34,
    oldPrice: 41,
  },
  {
    id: 5,
    image: "/img-8.png",
    alt: "Spade",
    text: "Spade",
    discount: 21,
    newPrice: 56,
    oldPrice: 71,
  },
  {
    id: 6,
    image: "/img-7.png",
    alt: "Hoe",
    text: "Hoe",
    discount: 11,
    newPrice: 31,
    oldPrice: 35,
  },
  {
    id: 7,
    image: "/img-6.png",
    alt: "Garden Fork",
    text: "Garden Fork",
    discount: 15,
    newPrice: 66,
    oldPrice: 78,
  },
  {
    id: 8,
    image: "/img-5.png",
    alt: "Sprayer",
    text: "Sprayer",
    discount: 21,
    newPrice: 85,
    oldPrice: 107,
  },
];

export default function ProductDetails() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const product = items.find(p => p.id === parseInt(id));

  if (!product) return <div className="product-not-found">Product not found</div>;

  return (
    <div className="product-details-wrapper">
      <div className="breadcrumbs">
        <span>Main page</span>
        <span>Categories</span>
        <span>Tools and equipment</span>
        <span className="active">{product.text}</span>
      </div>

      <div className="product-details">
        <div className="image-block">
          <img src={product.image} alt={product.alt} />
        </div>

        <div className="info-block">
          <h1 className="product-title">{product.text}</h1>
          <div className="price-row">
            <span className="new-price">${product.newPrice}</span>
            <span className="old-price">${product.oldPrice}</span>
            <span className="discount">-{product.discount}%</span>
          </div>

          <div className="quantity-cart">
            <div className="quantity-control">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button className="add-to-cart">Add to cart</button>
          </div>

          <div className="description">
            <h2>Description</h2>
            <p>Провтыкал где-то описание товара.</p>
            <a href="#">Read more</a>
          </div>
        </div>
      </div>
    </div>
  );
}