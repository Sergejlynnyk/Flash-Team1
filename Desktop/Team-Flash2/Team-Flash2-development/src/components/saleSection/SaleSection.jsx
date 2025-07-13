import React from 'react';
import styles from './SaleSection.module.scss';

const saleItems = [
  {
    id: 1,
    img: '/img-2.png',
    discount: '-50%',
    title: 'Decorative forged bridge',
    price: '$500',
    oldPrice: '$1000',
  },
  {
    id: 2,
    img: '/img-3.png',
    discount: '-34%',
    title: 'Flower basket',
    price: '$100',
    oldPrice: '$150',
  },
  {
    id: 3,
    img: '/img-4.png',
    discount: '-25%',
    title: 'Aquarium lock',
    price: '$150',
    oldPrice: '$200',
  },
  {
    id: 4,
    img: '/img-5.png',
    discount: '-17%',
    title: 'Secateurs',
    price: '$199',
    oldPrice: '$240',
  },
];

const SaleSection = () => (
  <section className={styles.saleitemsSection}>
    <div className={styles.saleitemsHeader}>
      <h2 className={styles.saleitemsTitle}>Sale</h2>
      <button className={styles.allSalesBtn}>All sales</button>
    </div>
    <div className={styles.itemsContainer}>
      {saleItems.map(item => (
        <div key={item.id} className={styles.itemCard}>
          <span className={styles.discountBadge}>{item.discount}</span>
          <div className={styles.iconBar}>
            <img src="/basket=heart%20empty.svg" alt="wishlist" className={styles.icon} />
            <img src="/basket=empty.svg" alt="cart" className={styles.icon} />
          </div>
          <img src={item.img} alt={item.title} className={styles.itemImage} />
          <div className={styles.itemText}>{item.title}</div>
          <div className={styles.itemPrices}>
            <span className={styles.newPrice}>{item.price}</span>
            <span className={styles.oldPrice}>{item.oldPrice}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default SaleSection;
