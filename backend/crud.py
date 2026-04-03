from sqlmodel import Session, create_engine, select
from typing import List, Optional
from models import Product, CartItem
from sqlmodel import Session, create_engine, select, SQLModel


username = "root"
password = "root"  
database_name = "shopping_cart_db"
DATABASE_URL = "sqlite:///./shopping_cart.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False}, echo=True)

def get_session():
    with Session(engine) as session:
        yield session

# Products
async def db_get_products(session: Session) -> List[Product]:
    return session.exec(select(Product)).all()

# Cart
async def db_get_cart(session: Session) -> List[CartItem]:
    return session.exec(select(CartItem)).all()

async def db_add_to_cart(session: Session, item: CartItem) -> CartItem:
    session.add(item)
    return item

async def db_update_cart_item(session: Session, item_id: str, quantity: int) -> Optional[CartItem]:
    item = session.get(CartItem, item_id)
    if not item:
        return None
    item.quantity = quantity
    session.add(item)
    return item

async def db_delete_cart_item(session: Session, item_id: str) -> bool:
    item = session.get(CartItem, item_id)
    if not item:
        return False
    session.delete(item)
    return True

SQLModel.metadata.create_all(engine)
