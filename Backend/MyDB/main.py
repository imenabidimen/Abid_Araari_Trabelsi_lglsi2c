from typing import Optional
from fastapi import FastAPI , Request
import mysql.connector
import json
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:4200",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/forum")
async def db_data(request : Request):

    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "Webclient")
    mycursor = mydb.cursor()
    body = json.loads(await request.body())
    mycursor.execute(f"INSERT into signup(nom, email,password) VAlUES( '{body['nom']}','{body['email']}','{body['pwd1']}')")
    mydb.commit()

@app.post("/login")
async def db_test(request : Request):

    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "Webclient")
    mycursor = mydb.cursor()
    body = json.loads(await request.body())
    mycursor.execute(f"SELECT nom, password from signup where nom='{body['user']}' and password='{body['pwd']}'")
    row_headers=[x[0] for x in mycursor.description] 
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
            json_data.append(dict(zip(row_headers,result)))
    return json_data
    
@app.post("/add")
async def add(request:Request):
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "testDB")
    mycursor = mydb.cursor()
    body = json.loads(await request.body())
    
    mycursor.execute(f"INSERT INTO `{body['type']}`( nom_dish, desc_dish, price_dish , img_dish,adresse_dish) VALUES ( '{body['nom']}', '{body['desc']}', '{body['price']}'  , '{body['img']}','{body['ad']}');")
    mydb.commit()
    return {"done"}

    
@app.get("/tunisian")
def gets():
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "testDB")
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM Tunisian")
  
    row_headers=[x[0] for x in mycursor.description] 
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    return json_data
@app.get("/dessert")
def gets():
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "testDB")
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM Dessert")
    row_headers=[x[0] for x in mycursor.description] 
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    return json_data
@app.get("/asian")
def gets():
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "testDB")
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM Asian")
    row_headers=[x[0] for x in mycursor.description] 
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    return json_data

@app.get("/signup")#hedhi GET
def gets():
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "Webclient")
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM signup")

    row_headers=[x[0] for x in mycursor.description] 
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    return json_data

@app.delete("/delete1")
async def db_delete(request : Request):

    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "testDB")
    mycursor = mydb.cursor()
    body = json.loads(await request.body())
    mycursor.execute(f"DELETE from Dessert where nom_dish='{body['user']}'")
    mydb.commit()
    
@app.delete("/delete2")
async def db_delete(request : Request):

    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "testDB")
    mycursor = mydb.cursor()
    body = json.loads(await request.body())
    mycursor.execute(f"DELETE from Tunisian where nom_dish='{body['user']}'")
    mydb.commit()
    return {"done"}
@app.delete("/delete3")
async def db_delete(request : Request):

    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "testDB")
    mycursor = mydb.cursor()
    body = json.loads(await request.body())
    mycursor.execute(f"DELETE from Italian where nom_dish='{body['user']}'")
    mydb.commit()
    return {"done"}
@app.delete("/delete4")
async def db_delete(request : Request):

    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "testDB")
    mycursor = mydb.cursor()
    body = json.loads(await request.body())
    mycursor.execute(f"DELETE from French where nom_dish='{body['user']}'")
    mydb.commit()
    return {"done"}
@app.delete("/delete5")
async def db_delete(request : Request):

    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "testDB")
    mycursor = mydb.cursor()
    body = json.loads(await request.body())
    mycursor.execute(f"DELETE from Asian where nom_dish='{body['user']}'")
    mydb.commit()
    print("Updated" + body)
    return {"done"}

@app.post("/update1")
async def db_update1(request : Request):

    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "testDB")
    mycursor = mydb.cursor()
    body = json.loads(await request.body())
    mycursor.execute(f"UPDATE Dessert SET desc_dish='{body['pwd']}',price_dish='{body['p']}',adresse_dish='{body['a']}' WHERE nom_dish='{body['user']}'")
    mydb.commit()
    return {"done"}

@app.post("/update2")
async def db_update(request : Request):

    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "testDB")
    mycursor = mydb.cursor()
    body = json.loads(await request.body())
    mycursor.execute(f"UPDATE Tunisian SET desc_dish='{body['pwd']}',price_dish='{body['p']}',adresse_dish='{body['a']}' WHERE nom_dish='{body['user']}'")
    mydb.commit()
    return {"done"}

@app.post("/update3")
async def db_update(request : Request):

    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "testDB")
    mycursor = mydb.cursor()
    body = json.loads(await request.body())
    mycursor.execute(f"UPDATE Asian SET desc_dish='{body['pwd']}',price_dish='{body['p']}',adresse_dish='{body['a']}' WHERE nom_dish='{body['user']}'")
    mydb.commit()
    return {"done"}


@app.post("/update4")
async def db_update(request : Request):

    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "testDB")
    mycursor = mydb.cursor()
    body = json.loads(await request.body())
    mycursor.execute(f"UPDATE French SET desc_dish='{body['pwd']}',price_dish='{body['p']}',adresse_dish='{body['a']}' WHERE nom_dish='{body['user']}'")
    mydb.commit()
    return {"done"}


@app.post("/update5")
async def db_update(request : Request):

    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "testDB")
    mycursor = mydb.cursor()
    body = json.loads(await request.body())
    mycursor.execute(f"UPDATE Italian SET desc_dish='{body['pwd']}',price_dish='{body['p']}',adresse_dish='{body['a']}' WHERE nom_dish='{body['user']}'")
    mydb.commit()
    return {"done"}


@app.get("/italian")
def gets():
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "testDB")
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM Italian")

    row_headers=[x[0] for x in mycursor.description] 
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    return json_data
@app.get("/french")
def gets():
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "testDB")
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM French")
    row_headers=[x[0] for x in mycursor.description] 
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    return json_data
