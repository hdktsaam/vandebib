-- Up
CREATE TABLE boek (  
    `idboek` INTEGER PRIMARY KEY,  
    `qrcode` VARCHAR(10) NOT NULL,  
    `titel` VARCHAR(45) NOT NULL,  
    `idauteur` INT NOT NULL,  
    `iduitgeverij` INT NOT NULL,  
    `ISBN` VARCHAR(45) NULL,  
    `uitgave` VARCHAR(45) NULL);

  CREATE TABLE uitgeverij (
    `iduitgeverij` INTEGER PRIMARY KEY, 
     `omschrijvingKort` VARCHAR(5) NOT NULL,  
     `omschrijvingLang` VARCHAR(45) NOT NULL);
  
  CREATE TABLE auteur ( 
     `idauteur` INTEGER PRIMARY KEY, 
   `naam` VARCHAR(45) NULL);

CREATE TABLE genre (  
    `idgenre` INTEGER PRIMARY KEY,  
`omschrijvingKort` VARCHAR(5) NOT NULL,  
`omschrijvingLang` VARCHAR(45) NOT NULL);

CREATE TABLE leeftijdscategorie (  
    `idleeftijdscategorie` INTEGER PRIMARY KEY,  
    `omschrijvingKort` VARCHAR(5) NOT NULL,  
    `omschrijvingLang` VARCHAR(50) NULL);


CREATE TABLE boekgenre (  
    `idboekgenre` INTEGER PRIMARY KEY, 
`idboek` INT NOT NULL,  
`idgenre` INT NOT NULL);
  
CREATE TABLE boekleeftijdscategorie ( 
     `idboekleeftijdscategorie` INTEGER PRIMARY KEY, 
      `idboek` INT NOT NULL, 
       `idleeftijdscategorie` INT NOT NULL);

CREATE TABLE afdeling (  `idafdeling` INTEGER PRIMARY KEY, 
 `omschrijvingKort` VARCHAR(5) NOT NULL, 
  `omschrijvingLang` VARCHAR(50) NOT NULL);
  
  CREATE TABLE plaats (  `idplaats` INTEGER PRIMARY KEY, 
   `idafdeling` INT NOT NULL, 
    `omschrijvingKort` VARCHAR(5) NOT NULL, 
     `omschrijvingLang` VARCHAR(50) NULL);
  
  CREATE TABLE boekplaats (  `idboekplaats` INTEGER PRIMARY KEY, 
   `idboek` INT NOT NULL, 
    `idplaats` INT NOT NULL,  
    `key` VARCHAR(50) NOT NULL);

CREATE TABLE appkey (  
    `idappkey` INTEGER PRIMARY KEY,
  `key` VARCHAR(50) NOT NULL);

CREATE  VIEW boeken AS
select boek.idboek, boek.qrcode, boek.titel, auteur.naam, uitgeverij.omschrijvingKort, boek.ISBN, boek.uitgave from boek 
join auteur on auteur.idauteur = boek.idauteur
join uitgeverij on uitgeverij.iduitgeverij = boek.iduitgeverij;
-- Down

DROP TABLE boek
DROP TABLE uitgeverij