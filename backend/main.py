from fastapi import FastAPI, HTTPException, Depends, Response, status
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session
from typing import List
from models import Product, CartItem
from crud import (
    get_session, db_get_products, db_get_cart,
    db_add_to_cart, db_update_cart_item, db_delete_cart_item
)

app = FastAPI(title="Shopping Cart API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# READ: Get all products
@app.get("/products", response_model=List[Product])
async def get_products(db: Session = Depends(get_session)):
    return await db_get_products(db)

# READ: Get all cart items
@app.get("/cart", response_model=List[CartItem])
async def get_cart(db: Session = Depends(get_session)):
    return await db_get_cart(db)

# CREATE: Add item to cart
@app.post("/cart", response_model=CartItem)
async def add_to_cart(item: CartItem, db: Session = Depends(get_session)):
    result = await db_add_to_cart(db, item)
    db.commit()
    db.refresh(result)
    return result

# UPDATE: Modify cart item quantity
@app.put("/cart/{item_id}", response_model=CartItem)
async def update_cart_item(item_id: str, quantity: int, db: Session = Depends(get_session)):
    result = await db_update_cart_item(db, item_id, quantity)
    if not result:
        raise HTTPException(status_code=404, detail="Cart item not found")
    db.commit()
    db.refresh(result)
    return result

# DELETE: Remove item from cart
@app.delete("/cart/{item_id}")
async def delete_cart_item(item_id: str, db: Session = Depends(get_session)):
    result = await db_delete_cart_item(db, item_id)
    if not result:
        raise HTTPException(status_code=404, detail="Cart item not found")
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)

