from sqlmodel import Session
from crud import engine
from models import Product

products = [
    Product(id="p1", name="3F UL LanShan 2 Ultralight Tent", price=299.95, description="", image_url="tent-lanshan2-green.jpeg", stock=50),
    Product(id="p2", name="3F UL LanShan 1 Ultralight Tent", price=224.95, description="", image_url="tent-lanshan1-khaki.jpeg", stock=50),
    Product(id="p3", name="Neve Gear Wallaroo 50L Backpack V3", price=229.00, description="", image_url="backpack-wallaroo.jpeg", stock=50),
    Product(id="p4", name="Osprey Exos 58 Hiking Pack", price=386.96, description="", image_url="pack-exos58.jpeg", stock=50),
    Product(id="p5", name="Osprey Eja 48 Womens Ultralight Pack", price=359.96, description="", image_url="pack-eja48-deep-teal.jpeg", stock=50),
    Product(id="p6", name="Neve Gear Waratah Quilt", price=350.10, description="", image_url="quilt-waratah.jpeg", stock=50),
    Product(id="p7", name="Radix Nutrition Mixed Berry Breakfast", price=13.46, description="", image_url="breakfast-radix.jpeg", stock=100),
    Product(id="p8", name="Campers Pantry Penne Bolognese Expedition", price=16.95, description="", image_url="pasta-campers.jpg", stock=100),
    Product(id="p9", name="Nitecore NB Air Power Bank", price=62.99, description="", image_url="powerbank-nitecore.jpg", stock=50),
]

with Session(engine) as session:
    for p in products:
        session.add(p)
    session.commit()
    print("Products seeded successfully!")