// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useCart } from "../../components/Cart/CartContext";
// import './AllSales.scss';
// import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

// const AllSales = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filters, setFilters] = useState({
//     minPrice: '',
//     maxPrice: '',
//     sortBy: '', // 'priceAsc', 'priceDesc', 'discount'
//   });

//   const { addToCart } = useCart();

//   const calculateDiscount = (oldPrice, price) => {
//     if (!oldPrice || !price || oldPrice <= price) return 0;
//     return Math.round(((oldPrice - price) / oldPrice) * 100);
//   };

//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const response = await fetch('https://exam-server-5c4e.onrender.com/products/all');
//         const allProducts = await response.json();

//         const formattedProducts = allProducts
//           .filter(p => p.discont_price !== null) // Только товары со скидкой
//           .map(product => ({
//             id: product.id,
//             name: product.title,
//             image: `https://exam-server-5c4e.onrender.com${product.image}`,
//             price: Number(product.discont_price || product.price),
//             oldPrice: Number(product.price),
//           }));

//         setProducts(formattedProducts);
//         setFilteredProducts(formattedProducts);
//       } catch (err) {
//         setError('Failed to load products. Please try again later.');
//         console.error('Error loading products:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProducts();
//   }, []);

//   useEffect(() => {
//     let result = [...products];

//     // 🔍 Фильтрация
//     if (filters.minPrice) {
//       result = result.filter(p => p.price >= Number(filters.minPrice));
//     }
//     if (filters.maxPrice) {
//       result = result.filter(p => p.price <= Number(filters.maxPrice));
//     }

//     // 🔄 Сортировка
//     switch (filters.sortBy) {
//       case 'priceAsc':
//         result.sort((a, b) => a.price - b.price);
//         break;
//       case 'priceDesc':
//         result.sort((a, b) => b.price - a.price);
//         break;
//       case 'discount':
//         result.sort((a, b) => {
//           const d1 = calculateDiscount(a.oldPrice, a.price);
//           const d2 = calculateDiscount(b.oldPrice, b.price);
//           return d2 - d1;
//         });
//         break;
//       default:
//         break;
//     }

//     setFilteredProducts(result);
//   }, [filters, products]);

//   const handleAddToCart = (product, e) => {
//     e.preventDefault();
//     addToCart({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       image: product.image,
//       quantity: 1,
//     });
//   };

//   if (loading) return <div className="loading">Loading products...</div>;
//   if (error) return <div className="error">{error}</div>;

//   return (
//     <div className="all-sales-container">
//       <h1 className="page-title">Discounted Items</h1>

//       <div className="filters">
//         <div className="filter-group">
//           <label>Price:</label>
//           <input
//             type="number"
//             placeholder="From"
//             value={filters.minPrice}
//             onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
//           />
//           <input
//             type="number"
//             placeholder="To"
//             value={filters.maxPrice}
//             onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
//           />
//         </div>

//         <div className="filter-group">
//           <label>Sort by:</label>
//           <select
//             value={filters.sortBy}
//             onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
//           >
//             <option value="">-- Select --</option>
//             <option value="priceAsc">Price: Low to High</option>
//             <option value="priceDesc">Price: High to Low</option>
//             <option value="discount">Biggest Discount</option>
//           </select>
//         </div>
//       </div>

//       {filteredProducts.length > 0 ? (
//         <div className="products-grid">
//           {filteredProducts.map(product => {
//             const discount = calculateDiscount(product.oldPrice, product.price);

//             return (
//               <Link to={`/product/${product.id}`} key={product.id} className="product-card">
//                 <div className="discount-badge">-{discount}%</div>
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="product-image"
//                   loading="lazy"
//                 />
//                 <div className="product-info">
//                   <h3 className="product-name">{product.name}</h3>
//                   <div className="prices">
//                     <span className="current-price">{product.price} €</span>
//                     <span className="old-price">{product.oldPrice} €</span>
//                   </div>
//                   <button
//                     className="add-to-cart"
//                     onClick={(e) => handleAddToCart(product, e)}
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>
//       ) : (
//         <div className="no-products">
//           <p>No products match your filters</p>
//           <button
//             className="reset-filters"
//             onClick={() => setFilters({ minPrice: '', maxPrice: '', sortBy: '' })}
//           >
//             Reset Filters
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllSales; 

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from "../../components/Cart/CartContext";
import './AllSales.scss';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { getDiscountedProducts } from '../../api/products';

const AllSales = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    sortBy: '', // 'priceAsc', 'priceDesc', 'discount'
  });

  const { addToCart } = useCart();

  // 👉 Хлебные крошки
  const breadcrumbItems = [
    { label: 'Main page', href: '/' },
    { label: 'All sales' }
  ];

  const calculateDiscount = (oldPrice, price) => {
    if (!oldPrice || !price || oldPrice <= price) return 0;
    return Math.round(((oldPrice - price) / oldPrice) * 100);
  };

useEffect(() => {
  const loadProducts = async () => {
    try {
      const discountedProducts = await getDiscountedProducts();
      
      const formattedProducts = discountedProducts.map(product => ({
        id: product.id,
        name: product.title,
        image: `https://exam-server-5c4e.onrender.com${product.image}`,
        price: Number(product.discont_price),
        oldPrice: Number(product.price),
      }));

      setProducts(formattedProducts);
      setFilteredProducts(formattedProducts);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  loadProducts();
}, []);
  useEffect(() => {
    let result = [...products];

    // 🔍 Фильтрация
    if (filters.minPrice) {
      result = result.filter(p => p.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter(p => p.price <= Number(filters.maxPrice));
    }

    // 🔄 Сортировка
    switch (filters.sortBy) {
      case 'priceAsc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'discount':
        result.sort((a, b) => {
          const d1 = calculateDiscount(a.oldPrice, a.price);
          const d2 = calculateDiscount(b.oldPrice, b.price);
          return d2 - d1;
        });
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [filters, products]);

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="all-sales-container">
      {/* Хлебные крошки */}
      <Breadcrumbs items={breadcrumbItems} />

      <h1 className="page-title">Discounted Items</h1>

      <div className="filters">
        <div className="filter-group">
          <label>Price:</label>
          <input
            type="number"
            placeholder="From"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          />
          <input
            type="number"
            placeholder="To"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          />
        </div>

        <div className="filter-group">
          <label>Sort by:</label>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          >
            <option value="">-- Select --</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="discount">Biggest Discount</option>
          </select>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map(product => {
            const discount = calculateDiscount(product.oldPrice, product.price);

            return (
              <Link to={`/product/${product.id}`} key={product.id} className="product-card">
                <div className="discount-badge">-{discount}%</div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                  loading="lazy"
                />
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="prices">
                    <span className="current-price">{product.price} €</span>
                    <span className="old-price">{product.oldPrice} €</span>
                  </div>
                  <button
                    className="add-to-cart"
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="no-products">
          <p>No products match your filters</p>
          <button
            className="reset-filters"
            onClick={() => setFilters({ minPrice: '', maxPrice: '', sortBy: '' })}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default AllSales;