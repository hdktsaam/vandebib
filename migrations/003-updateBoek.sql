--Up
Alter table boek ADD COLUMN figuurURL VARCHAR(50);
Drop view boeken;
CREATE  VIEW boeken AS
select boek.idboek, boek.qrcode, boek.titel, boek.figuurURL, auteur.naam, uitgeverij.omschrijvingKort, boek.ISBN, boek.uitgave from boek 
join auteur on auteur.idauteur = boek.idauteur
join uitgeverij on uitgeverij.iduitgeverij = boek.iduitgeverij;
--Down