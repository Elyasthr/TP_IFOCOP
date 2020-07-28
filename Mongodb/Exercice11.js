// Vélib
// Récupérer un fichier json des velib chez jcdecaux developer
// Importer dans la base paris, le fichier jcdecaux.json dans une collection velib
// Cette fois-ci les données sous fournies sous la forme d'un tableau d'objets, il faut donc ajouter l'option --jsonArray pour importer
//mongoimport --db paris --collection velib --file jcdecaux.json --jsonArray

// Problème ! On n'a pas de champ codepostal ... On retrouve le code postal dans l'adresse.


// Mettez à jour tous les enregistrements en leur ajoutant un champ zipCode

// Je crée un curseur qui contient toutes les stations


// Quel est l'arrondissement de Paris ou il y a le plus de stations ? (avec un $in)      


// OU plus élégant 

// Quelle est la ville (hors Paris) qui a le plus de stations

// OU plus élégant 

// Cherchez la piscine Dunois .

// Quelles sont les 5 stations velib les plus proches de la piscine Dunois ?
// Première version : en utilisant une fonction de calcul de distance
https://www.geodatasource.com/developers/javascript

function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist;
    }
}


// On peut faire notre find pour trouver les 5 stations les plus proches


// Seconde version : en modifiant la structure de la collection et en utilisant l'opérateur géographique $near
// Pour utiliser $near il faut :
 // - respecter l'organisation de GeoJSON (geoJson.org)
 // - avoir un index de type 2dsphere

// Issu de la doc, il faut obtenir cette structure
// "coordonneesStation": {
//    "type": "Point",
//    "coordinates": [ longitude, latitude ]
//  }



// Ajout d'un index de type 2dsphere :

// On peut à présent faire notre find() avec l'opérateur $near
