CREATE DATABASE IF NOT EXISTS testDB
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE testDB;

CREATE TABLE IF NOT EXISTS Tunisian (
  nom_dish VARCHAR(255) NOT NULL,
  desc_dish TEXT NOT NULL,
  price_dish DECIMAL(10,2) NOT NULL,
  img_dish VARCHAR(500) NOT NULL,
  adresse_dish VARCHAR(255) NOT NULL,
  PRIMARY KEY (nom_dish)
);

CREATE TABLE IF NOT EXISTS Dessert (
  nom_dish VARCHAR(255) NOT NULL,
  desc_dish TEXT NOT NULL,
  price_dish DECIMAL(10,2) NOT NULL,
  img_dish VARCHAR(500) NOT NULL,
  adresse_dish VARCHAR(255) NOT NULL,
  PRIMARY KEY (nom_dish)
);

CREATE TABLE IF NOT EXISTS Asian (
  nom_dish VARCHAR(255) NOT NULL,
  desc_dish TEXT NOT NULL,
  price_dish DECIMAL(10,2) NOT NULL,
  img_dish VARCHAR(500) NOT NULL,
  adresse_dish VARCHAR(255) NOT NULL,
  PRIMARY KEY (nom_dish)
);

CREATE TABLE IF NOT EXISTS Italian (
  nom_dish VARCHAR(255) NOT NULL,
  desc_dish TEXT NOT NULL,
  price_dish DECIMAL(10,2) NOT NULL,
  img_dish VARCHAR(500) NOT NULL,
  adresse_dish VARCHAR(255) NOT NULL,
  PRIMARY KEY (nom_dish)
);

CREATE TABLE IF NOT EXISTS French (
  nom_dish VARCHAR(255) NOT NULL,
  desc_dish TEXT NOT NULL,
  price_dish DECIMAL(10,2) NOT NULL,
  img_dish VARCHAR(500) NOT NULL,
  adresse_dish VARCHAR(255) NOT NULL,
  PRIMARY KEY (nom_dish)
);
