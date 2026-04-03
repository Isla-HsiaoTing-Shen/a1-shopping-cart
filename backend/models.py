from sqlmodel import Field, SQLModel
from typing import Optional

class Product(SQLModel, table=True):
    __tablename__ = "products"
    id: str = Field(max_length=25, primary_key=True)
    name: str = Field(max_length=100)
    price: float
    description: Optional[str] = Field(default="", max_length=500)
    image_url: Optional[str] = Field(default="", max_length=500)
    stock: int = Field(default=100)

class CartItem(SQLModel, table=True):
    __tablename__ = "cart_items"
    id: str = Field(max_length=25, primary_key=True)
    product_id: str = Field(max_length=25, foreign_key="products.id")
    product_name: str = Field(max_length=100)
    price: float
    quantity: int = Field(default=1)
