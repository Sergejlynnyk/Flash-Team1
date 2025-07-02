import React from 'react';
import './SaleItems.scss';

const SaleItems = () => {
  return (
    <section className="saleitems-section">
      <div className="saleitems-header">
        <h2 className="saleitems-title">Sale</h2>
      </div>

      <div className="items-container">
        {/* Produkt 1 */}
        <div className="item-card">
          <div className="discount-badge">-50%</div>
          <div className="icon-bar">
            <img src="/basket=empty.svg" alt="Cart" className="icon" />
            <img src="/basket=heart empty.svg" alt="Like" className="icon" />
          </div>
          <img src="/11.png" alt="Decorative forged bridge" className="item-image" />
          <div className="item-text">Decorative forged bridge</div>
          <div className="item-prices">
            <span className="new-price">$500</span>
            <span className="old-price">$1000</span>
          </div>
        </div>

        {/* Produkt 2 */}
        <div className="item-card">
          <div className="discount-badge">-34%</div>
          <div className="icon-bar">
            <img src="/basket=empty.svg" alt="Cart" className="icon" />
            <img src="/basket=heart empty.svg" alt="Like" className="icon" />
          </div>
          <img src="/12.png" alt="Flower basket" className="item-image" />
          <div className="item-text">Flower basket</div>
          <div className="item-prices">
            <span className="new-price">$100</span>
            <span className="old-price">$150</span>
          </div>
        </div>

        {/* Produkt 3 */}
        <div className="item-card">
          <div className="discount-badge">-25%</div>
          <div className="icon-bar">
            <img src="/basket=empty.svg" alt="Cart" className="icon" />
            <img src="/basket=heart empty.svg" alt="Like" className="icon" />
          </div>
          <img src="/13.png" alt="Aquarium lock" className="item-image" />
          <div className="item-text">Aquarium lock</div>
          <div className="item-prices">
            <span className="new-price">$150</span>
            <span className="old-price">$200</span>
          </div>
        </div>

        {/* Produkt 4 */}
        <div className="item-card">
          <div className="discount-badge">-17%</div>
          <div className="icon-bar">
            <img src="/basket=empty.svg" alt="Cart" className="icon" />
            <img src="/basket=heart empty.svg" alt="Like" className="icon" />
          </div>
          <img src="/14.png" alt="Secateurs" className="item-image" />
          <div className="item-text">Secateurs</div>
          <div className="item-prices">
            <span className="new-price">$199</span>
            <span className="old-price">$240</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaleItems;
