import os
from typing import Any

import mysql.connector
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI(title="Foody API", version="1.0.0")

origins = [
    origin.strip()
    for origin in os.getenv("CORS_ORIGINS", "http://localhost:4200").split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DISH_TABLES = {
    "tunisian": "Tunisian",
    "dessert": "Dessert",
    "asian": "Asian",
    "italian": "Italian",
    "french": "French",
}


class SignupRequest(BaseModel):
    name: str
    email: str
    password: str


class LoginRequest(BaseModel):
    user: str
    password: str


class DishRequest(BaseModel):
    name: str
    description: str
    price: str
    image: str
    address: str


class DishUpdateRequest(BaseModel):
    name: str
    description: str
    price: str
    address: str


def connect(database: str):
    return mysql.connector.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=int(os.getenv("DB_PORT", "3306")),
        user=os.getenv("DB_USER", "root"),
        password=os.getenv("DB_PASSWORD", ""),
        database=database,
    )


def rows_as_dicts(cursor) -> list[dict[str, Any]]:
    columns = [column[0] for column in cursor.description]
    return [dict(zip(columns, row)) for row in cursor.fetchall()]


def dish_table(category: str) -> str:
    table = DISH_TABLES.get(category.lower())
    if not table:
        raise HTTPException(status_code=404, detail="Unknown dish category")
    return table


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/forum")
def signup(payload: SignupRequest):
    db = connect("Webclient")
    try:
        cursor = db.cursor()
        cursor.execute(
            "INSERT INTO signup(nom, email, password) VALUES (%s, %s, %s)",
            (payload.name, payload.email, payload.password),
        )
        db.commit()
        return {"done": True}
    finally:
        cursor.close()
        db.close()


@app.post("/login")
def login(payload: LoginRequest):
    db = connect("Webclient")
    try:
        cursor = db.cursor()
        cursor.execute(
            "SELECT nom, password FROM signup WHERE nom = %s AND password = %s",
            (payload.user, payload.password),
        )
        return rows_as_dicts(cursor)
    finally:
        cursor.close()
        db.close()


@app.post("/add")
def add_dish(payload: DishRequest):
    table = dish_table(payload.name)
    db = connect("testDB")
    try:
        cursor = db.cursor()
        cursor.execute(
            f"INSERT INTO {table} "
            "(nom_dish, desc_dish, price_dish, img_dish, adresse_dish) "
            "VALUES (%s, %s, %s, %s, %s)",
            (
                payload.name,
                payload.description,
                payload.price,
                payload.image,
                payload.address,
            ),
        )
        db.commit()
        return {"done": True}
    finally:
        cursor.close()
        db.close()


@app.get("/{category}")
def list_dishes(category: str):
    table = dish_table(category)
    db = connect("testDB")
    try:
        cursor = db.cursor()
        cursor.execute(f"SELECT * FROM {table}")
        return rows_as_dicts(cursor)
    finally:
        cursor.close()
        db.close()


@app.delete("/{category}/{name}")
def delete_dish(category: str, name: str):
    table = dish_table(category)
    db = connect("testDB")
    try:
        cursor = db.cursor()
        cursor.execute(f"DELETE FROM {table} WHERE nom_dish = %s", (name,))
        db.commit()
        return {"done": True}
    finally:
        cursor.close()
        db.close()


@app.put("/{category}/{name}")
def update_dish(category: str, name: str, payload: DishUpdateRequest):
    table = dish_table(category)
    db = connect("testDB")
    try:
        cursor = db.cursor()
        cursor.execute(
            f"UPDATE {table} "
            "SET desc_dish = %s, price_dish = %s, adresse_dish = %s "
            "WHERE nom_dish = %s",
            (payload.description, payload.price, payload.address, name),
        )
        db.commit()
        return {"done": True}
    finally:
        cursor.close()
        db.close()


@app.get("/users")
def list_users():
    db = connect("Webclient")
    try:
        cursor = db.cursor()
        cursor.execute("SELECT nom, email FROM signup")
        return rows_as_dicts(cursor)
    finally:
        cursor.close()
        db.close()
