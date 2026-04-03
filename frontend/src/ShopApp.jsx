import { useState, useEffect } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import './ShopApp.css';

const API = 'http://127.0.0.1:8000';

const PRODUCTS_CONFIG = {
  p1: { colors: ['Green', 'Khaki'], sizes: [] },
  p2: { colors: ['Khaki', 'Dark Grey'], sizes: [] },
  p3: { colors: [], sizes: ['Small', 'Medium', 'Large'] },
  p4: { colors: [], sizes: ['S/M', 'L/XL'] },
  p5: { colors: ['Deep Teal', 'Purple Dusk'], sizes: ['XS/S', 'M/L'] },
  p6: { colors: [], sizes: ["5'6 Short", "6' Reg", "6'6 Long"], temps: ['-2°C', '-8°C'] },
  p7: { colors: [], sizes: [] },
  p8: { colors: [], sizes: [] },
  p9: { colors: [], sizes: [] },
};

const heroImages = ['hero1.jpeg', 'hero2.jpeg', 'hero3.jpeg', 'hero4.jpeg'];

export default function ShopApp() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [variant, setVariant] = useState({ color: '', size: '', temp: '' });
  const [heroIndex, setHeroIndex] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);


  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex(i => (i + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

// READ: Fetch all products from backend API
  const fetchProducts = async () => {
    const res = await fetch(`${API}/products`);
    const data = await res.json();
    setProducts(data);
  };

  // ===== READ: Fetch current cart items from backend API =====
  const fetchCart = async () => {
    const res = await fetch(`${API}/cart`);
    const data = await res.json();
    setCart(data);
  };

  const openProduct = (product) => {
    setSelectedProduct(product);
    const cfg = PRODUCTS_CONFIG[product.id] || {};
    setVariant({
      color: cfg.colors?.[0] || '',
      size: cfg.sizes?.[0] || '',
      temp: cfg.temps?.[0] || '',
    });
  };

// CREATE: Add selected product to cart, or increment qty if already exists
  const addToCart = async () => {
    const cfg = PRODUCTS_CONFIG[selectedProduct.id] || {};
    const parts = [variant.color, variant.size, variant.temp].filter(Boolean);
    const variantStr = parts.join(' / ') || 'Standard';

    const existing = cart.find(
      i => i.product_id === selectedProduct.id && i.variant === variantStr
    );

    if (existing) {
      await updateQty(existing.id, existing.quantity + 1);
    } else {
      await fetch(`${API}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: Date.now().toString(),
          product_id: selectedProduct.id,
          product_name: selectedProduct.name,
          price: selectedProduct.price,
          quantity: 1,
          variant: variantStr,
        }),
      });
    }
    await fetchCart();
    setSelectedProduct(null);
    setCartOpen(true);
  };

//UPDATE: Change quantity of a cart item, delete if quantity reaches 0
  const updateQty = async (id, quantity) => {
    if (quantity < 1) return deleteItem(id);
    await fetch(`${API}/cart/${id}?quantity=${quantity}`, { method: 'PUT' });
    fetchCart();
  };

// DELETE: Remove a cart item from the database
  const deleteItem = async (id) => {
    await fetch(`${API}/cart/${id}`, { method: 'DELETE' });
    fetchCart();
  };

  
  const handleCheckout = async () => {
  for (const item of cart) {
    await fetch(`${API}/cart/${item.id}`, { method: 'DELETE' });
  }
  await fetchCart();
  setCartOpen(false);
  setOrderPlaced(true);
};
  
  
  
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <span className="logo-text">Hike Simple</span>
        </div>
        <button className="cart-btn" onClick={() => setCartOpen(true)}>
          <ShoppingCart size={22} />
          {cart.length > 0 && <span className="cart-badge">{cart.reduce((s,i)=>s+i.quantity,0)}</span>}
        </button>
      </header>

      {/* Hero Banner */}
      <section className="hero">
        {heroImages.map((img, i) => (
          <img
            key={img}
            src={`/${img}`}
            alt="hero"
            className={`hero-img ${i === heroIndex ? 'active' : ''}`}
          />
        ))}
        <div className="hero-overlay">
          <h1>Less Weight. More Adventure.</h1>
          <p>Ultralight hiking gear for the modern adventurer</p>
        </div>
        <div className="hero-dots">
          {heroImages.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === heroIndex ? 'active' : ''}`}
              onClick={() => setHeroIndex(i)}
            />
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="products-section">
        <h2 className="section-title">Our Gear</h2>
        <div className="products-grid">
          {products.map(p => (
            <div key={p.id} className="product-card" onClick={() => openProduct(p)}>
              <div className="product-img-wrap">
                <img src={`/${p.image_url}`} alt={p.name} className="product-img" />
              </div>
              <div className="product-info">
                <h3 className="product-name">{p.name}</h3>
                <p className="product-price">${p.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>
              <X size={20} />
            </button>
            <img src={`/${selectedProduct.image_url}`} alt={selectedProduct.name} className="modal-img" />
            <div className="modal-body">
              <h2>{selectedProduct.name}</h2>
              <p className="modal-price">${selectedProduct.price.toFixed(2)}</p>
              {selectedProduct.description && (
                <p className="modal-desc">{selectedProduct.description}</p>
              )}
              {PRODUCTS_CONFIG[selectedProduct.id]?.colors?.length > 0 && (
                <div className="variant-group">
                  <label>Colour</label>
                  <select value={variant.color} onChange={e => setVariant({...variant, color: e.target.value})}>
                    {PRODUCTS_CONFIG[selectedProduct.id].colors.map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              )}
              {PRODUCTS_CONFIG[selectedProduct.id]?.sizes?.length > 0 && (
                <div className="variant-group">
                  <label>Size</label>
                  <select value={variant.size} onChange={e => setVariant({...variant, size: e.target.value})}>
                    {PRODUCTS_CONFIG[selectedProduct.id].sizes.map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              )}
              {PRODUCTS_CONFIG[selectedProduct.id]?.temps?.length > 0 && (
                <div className="variant-group">
                  <label>Comfort Rating</label>
                  <select value={variant.temp} onChange={e => setVariant({...variant, temp: e.target.value})}>
                    {PRODUCTS_CONFIG[selectedProduct.id].temps.map(t => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              )}
              <button className="add-to-cart-btn" onClick={addToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
          <div className="cart-sidebar" onClick={e => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Your Cart</h2>
              <button onClick={() => setCartOpen(false)}><X size={20} /></button>
            </div>
            <div className="cart-items">
              {cart.length === 0 ? (
                <p className="cart-empty">Your cart is empty</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <p className="cart-item-name">{item.product_name}</p>
                      <p className="cart-item-variant">{item.variant}</p>
                      <p className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div className="cart-item-controls">
                      <button onClick={() => updateQty(item.id, item.quantity - 1)}><Minus size={14} /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, item.quantity + 1)}><Plus size={14} /></button>
                      <button className="delete-btn" onClick={() => deleteItem(item.id)}><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
              </div>
            )}
          </div>
        </div>
      )}

        {/* Order Success Modal */}
        {orderPlaced && (
            <div className="modal-overlay" onClick={() => setOrderPlaced(false)}>
            <div className="modal order-modal" onClick={e => e.stopPropagation()}>
                <div className="order-success">
                <div className="order-icon">🎉</div>
                <h2>Order Placed!</h2>
                <p>Thank you for your order.</p>
                <p>Your gear is on its way to the trailhead!</p>
                <button className="add-to-cart-btn" onClick={() => setOrderPlaced(false)}>
                    Continue Shopping
                </button>
                </div>
            </div>
            </div>
        )}
   
    </div>
  );
}