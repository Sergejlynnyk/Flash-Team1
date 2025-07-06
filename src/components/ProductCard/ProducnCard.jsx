

import { Link } from 'react-router-dom';

const ProductsCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="block border rounded p-2 hover:shadow-md">
      <img src={product.image} alt={product.title} className="w-full h-40 object-cover" />
      <h2 className="text-lg font-semibold">{product.title}</h2>
      <p>{product.price} €</p>
    </Link>
  );
};

export default ProductsCard;
                                          