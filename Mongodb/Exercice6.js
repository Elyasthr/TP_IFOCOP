// Revenez sur la base "videoclub"
////mongoimport --db videoclub --collection film --file videoclub.json;
//use videoclub
// Trouver un film dont le nom contient 'vache' (en utilisant une expression régulière)
db.film.find( { titre: { $regex: /x/ } })
db.film.find( { titre: { $regex: 'x' } })
// équivalent
db.film.find( { titre: /x/  })

// Afficher uniquement le prenom des acteurs de ce film
db.film.find( { titre: /x/  },{titre: 1, _id:0})

// Trouver les films dont un acteur s'appelle René

