"""Foody API."""
import base64, hashlib, hmac, os, secrets
from contextlib import closing
from typing import Dict, List
import mysql.connector
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="Foody API", version="1.0.0")
origins = [x.strip() for x in os.getenv("CORS_ORIGINS", "http://localhost:4200,http://127.0.0.1:4200").split(",") if x.strip()]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

DISH_TABLES = {"tunisian":"Tunisian","italian":"Italian","dessert":"Dessert","asian":"Asian","french":"French"}
TABLE_BY_UPDATE_ROUTE = {1:"Dessert",2:"Tunisian",3:"Asian",4:"French",5:"Italian"}
PASSWORD_ITERATIONS = 210_000

class SignupRequest(BaseModel):
    nom: str = Field(min_length=1, max_length=100)
    email: str = Field(min_length=3, max_length=100)
    pwd1: str = Field(min_length=8, max_length=128)
class LoginRequest(BaseModel):
    user: str = Field(min_length=1, max_length=100)
    pwd: str = Field(min_length=1, max_length=128)
class DishRequest(BaseModel):
    nom: str = Field(min_length=1, max_length=150)
    type: str
    desc: str = Field(default="", max_length=2000)
    price: float = Field(ge=0)
    ad: str = Field(default="", max_length=255)
    img: str = Field(default="", max_length=2_500_000)
class DishUpdateRequest(BaseModel):
    user: str = Field(min_length=1, max_length=150)
    pwd: str = Field(default="", max_length=2000)
    p: float = Field(ge=0)
    a: str = Field(default="", max_length=255)

def get_connection(database: str):
    return mysql.connector.connect(host=os.getenv("DB_HOST","127.0.0.1"), port=int(os.getenv("DB_PORT","3306")),
        user=os.getenv("DB_USER","foody"), password=os.getenv("DB_PASSWORD",""), database=database)

def password_hash(password: str) -> str:
    salt = secrets.token_bytes(12)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, PASSWORD_ITERATIONS)
    encoded_salt = base64.urlsafe_b64encode(salt).decode().rstrip("=")
    encoded_digest = base64.urlsafe_b64encode(digest).decode().rstrip("=")
    return "pbkdf2_sha256$" + str(PASSWORD_ITERATIONS) + "$" + encoded_salt + "$" + encoded_digest

def verify_password(password: str, stored: str) -> bool:
    if not stored.startswith("pbkdf2_sha256$"):
        return hmac.compare_digest(password, stored)
    try:
        _, iterations, salt, expected = stored.split("$", 3)
        padding = "=" * (-len(salt) % 4)
        salt_bytes = base64.urlsafe_b64decode(salt + padding)
        digest = hashlib.pbkdf2_hmac("sha256", password.encode(), salt_bytes, int(iterations))
        encoded_digest = base64.urlsafe_b64encode(digest).decode().rstrip("=")
        return hmac.compare_digest(encoded_digest, expected)
    except (ValueError, TypeError):
        return False

def read_table(table: str) -> List[Dict]:
    with closing(get_connection("testDB")) as db, closing(db.cursor(dictionary=True)) as cursor:
        cursor.execute("SELECT * FROM " + table)
        return cursor.fetchall()

@app.get("/health")
def health():
    try:
        with closing(get_connection("testDB")) as db:
            db.ping(reconnect=False, attempts=1, delay=0)
        return {"status":"ok","database":"ok"}
    except Exception:
        raise HTTPException(status_code=503, detail="Database unavailable")

@app.post("/forum")
def signup(payload: SignupRequest):
    with closing(get_connection("Webclient")) as db, closing(db.cursor(dictionary=True)) as cursor:
        cursor.execute("SELECT nom,email FROM signup WHERE nom=%s OR email=%s LIMIT 1",(payload.nom,payload.email))
        if cursor.fetchone():
            raise HTTPException(status_code=409, detail="An account already exists")
        cursor.execute("INSERT INTO signup (nom,email,password) VALUES (%s,%s,%s)",(payload.nom,payload.email,password_hash(payload.pwd1)))
        db.commit()
    return {"nom":payload.nom,"email":payload.email}

@app.post("/login")
def login(payload: LoginRequest):
    with closing(get_connection("Webclient")) as db, closing(db.cursor(dictionary=True)) as cursor:
        cursor.execute("SELECT nom,email,password FROM signup WHERE nom=%s OR email=%s LIMIT 1",(payload.user,payload.user))
        account = cursor.fetchone()
        if not account or not verify_password(payload.pwd,account["password"]):
            raise HTTPException(status_code=401,detail="Invalid username or password")
        if not account["password"].startswith("pbkdf2_sha256$"):
            cursor.execute("UPDATE signup SET password=%s WHERE nom=%s",(password_hash(payload.pwd),account["nom"]))
            db.commit()
    return {"nom":account["nom"],"email":account["email"]}

@app.get("/signup")
def accounts():
    with closing(get_connection("Webclient")) as db, closing(db.cursor(dictionary=True)) as cursor:
        cursor.execute("SELECT nom,email FROM signup ORDER BY nom")
        return cursor.fetchall()

@app.post("/add")
def add_dish(payload: DishRequest):
    table=DISH_TABLES.get(payload.type.lower())
    if not table:
        raise HTTPException(status_code=400,detail="Unknown dish category")
    with closing(get_connection("testDB")) as db, closing(db.cursor()) as cursor:
        cursor.execute("INSERT INTO "+table+" (nom_dish,desc_dish,price_dish,img_dish,adresse_dish) VALUES (%s,%s,%s,%s,%s)",
            (payload.nom,payload.desc,payload.price,payload.img,payload.ad))
        db.commit()
    return {"ok":True,"name":payload.nom,"category":table}

@app.get("/{category}")
def dishes(category: str):
    table=DISH_TABLES.get(category.lower())
    if not table:
        raise HTTPException(status_code=404,detail="Unknown category")
    return read_table(table)

@app.delete("/delete{route}")
def delete_dish(route:int,payload:Dict[str,str]):
    table={1:"Dessert",2:"Tunisian",3:"Italian",4:"French",5:"Asian"}.get(route)
    if not table or not payload.get("user"):
        raise HTTPException(status_code=400,detail="Invalid delete request")
    with closing(get_connection("testDB")) as db, closing(db.cursor()) as cursor:
        cursor.execute("DELETE FROM "+table+" WHERE nom_dish=%s",(payload["user"],))
        db.commit()
    return {"ok":True}

@app.post("/update{route}")
def update_dish(route:int,payload:DishUpdateRequest):
    table=TABLE_BY_UPDATE_ROUTE.get(route)
    if not table:
        raise HTTPException(status_code=400,detail="Unknown dish category")
    with closing(get_connection("testDB")) as db, closing(db.cursor()) as cursor:
        cursor.execute("UPDATE "+table+" SET desc_dish=%s,price_dish=%s,adresse_dish=%s WHERE nom_dish=%s",
            (payload.pwd,payload.p,payload.a,payload.user))
        db.commit()
    return {"ok":True}
