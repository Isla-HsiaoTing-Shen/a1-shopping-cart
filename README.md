# Hike Simple

## Project Summary
Hike Simple is a single-page e-commerce website for ultralight hiking gear. It makes browsing and buying gear fast, clean and designed for hikers who wants to spend less time shopping and more time out on the trail.


## Technical Stack
- **Frontend:** React (Vite)
- **Styling:** Custom CSS 
- **Backend:** Python, FastAPI
- **Database:** SQLite 

## Features
- Hero image carousel with auto-play and manual dot navigation
- Product grid displaying all available hiking gear
- Product detail modal with colour/size/temperature variant selection
- Slide-in cart sidebar showing all added items
- Quantity adjustment controls for each cart item
- Remove individual items from cart
- Checkout flow that clears the cart and shows order confirmation
- Nature-inspired colour palette (Khaki Beige, Jungle Teal, Blue Slate)

## Folder Structure
```
a1-shopping-cart/
├── backend/
│   ├── main.py          # FastAPI app and API endpoints
│   ├── crud.py          # Database CRUD operations and SQLite connection
│   ├── models.py        # SQLModel data models (Product, CartItem)
│   ├── seed.py          # Script to populate initial product data
│   └── shopping_cart.db # SQLite database file
└── frontend/
    ├── public/          # Static assets (product images, hero photos)
    └── src/
        ├── App.jsx      # App entry point
        ├── ShopApp.jsx  # Main application component
        └── ShopApp.css  # All styles
    ├── index.html       # Single HTML file (SPA)
    └── package.json     # Frontend dependencies

```

## Challenges Overcome
One of the biggest challenges I faced was setting up the database connection. I started with MySQL, but later switched to SQLite because it was easier to run across different machines and didn’t take up as much local storage. Another challenge was keeping the cart state consistent between the frontend and backend. I had to make sure that when users updated item quantities, the data stayed in sync so they wouldn’t see outdated or incorrect information. I also added extra logic to handle product variants like colour and size, making sure the system added the exact version of the product to the cart.

## Quick Start

### Prerequisites
- Python 3.9+
- Node.js 18+

### 1. Run the Backend
```bash
cd backend
pip install fastapi uvicorn sqlmodel aiosqlite
python seed.py
python -m uvicorn main:app --reload
```

### 2. Run the Frontend
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```

### 3. Open the App
Go to `http://localhost:5173` in your browser.