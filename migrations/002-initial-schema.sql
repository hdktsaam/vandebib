--Up
CREATE  VIEW plaatsen AS
select plaats.idplaats, plaats.omschrijvingkort as plaatskort, afdeling.omschrijvingkort as afdelingkort from plaats
join afdeling on afdeling.idafdeling = plaats.idafdeling;

--Down