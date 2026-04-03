# Hike Simple 🏔️

## Project Summary
Hike Simple is a single-page e-commerce application for ultralight hiking gear. It solves the problem of browsing and purchasing outdoor equipment in a seamless, distraction-free interface — designed for hikers who want to spend less time shopping and more time on the trail.

## Technical Stack
- **Frontend:** React (Vite), JSX
- **Styling:** Custom CSS with a nature-inspired colour palette
- **Routing:** Single-page application (no routing library needed)
- **Backend:** Python, FastAPI
- **Database:** SQLite via SQLModel (ORM)
- **API:** RESTful API with CORS enabled

## Features
- 🖼️ Hero image carousel with auto-play and manual dot navigation
- 🛍️ Product grid displaying all available hiking gear
- 🔍 Product detail modal with colour/size/temperature variant selection
- 🛒 Slide-in cart sidebar showing all added items
- ➕➖ Quantity adjustment controls for each cart item
- 🗑️ Remove individual items from cart
- 💳 Checkout flow that clears the cart and shows order confirmation
- 📱 Responsive design that works on mobile and desktop
- 🎨 Nature-inspired colour palette (Khaki Beige, Jungle Teal, Blue Slate)

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
```

## Challenges Overcome
One of the main challenges was configuring the database connection, starting with MySQL before migrating to SQLite for portability. Setting up CORS middleware in FastAPI was necessary to allow the React frontend to communicate with the backend API. Handling product variants (colour, size, temperature rating) required a client-side configuration map to keep the database schema simple while still providing a rich selection experience. Managing cart state between frontend and backend required careful synchronisation, particularly when updating quantities to avoid stale data being displayed to the user.