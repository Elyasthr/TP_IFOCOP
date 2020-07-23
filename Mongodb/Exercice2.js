//pour importer les fichiers dans la base de donnée
//mongoimport --db paris --collection piscines --file piscines_paris.json;

db.collection.find(query, projection);

//pour acceder a la base de donnée
//use paris;

db.piscines.find({},{})
db.piscines.find({zipCode: 75009})
// Pour compter les éléments
db.piscines.find({zipCode: 75009}).count()
// ou
db.piscines.count({zipCode: 75009})

// Pour les piscines du 11ème
db.piscines.find({zipCode: 75011})
// Pour les piscines du 11ème, n'affichez que les champs nom et code postal
// Je dois utiliser le deuxième argument de la méthode find : la projection
db.piscines.find(
    { zipCode : 75011},    // query
    { name: 1, zipCode : 1 }        // projection
)
// La projection sert à limiter les champs renvoyés par une requête
// Par défaut, le champ _id est présent. Il faut l'exclure explicitement
db.piscines.find(
    { zipCode : 75011},    // query
    { name: 1, zipCode : 1, _id : 0 }        // projection
)

// Pour limiter le nombre de résultats, on utilise
db.piscines.find().limit(3)

// Pour trier par nom
db.piscines.find({}, {name:1, _id:0}).sort({ name : 1 })


