// Revenez sur la base "videoclub"
////mongoimport --db videoclub --collection film --file videoclub.json;
//use videoclub
// Trouver un film dont le nom contient 'vache' (en utilisant une expression régulière)
db.film.find( { titre: " Matrix" } )
// équivalent


// Afficher uniquement le prenom des acteurs de ce film

// Trouver les films dont un acteur s'appelle René

