// Créer une base de données newyork et une collection restaurants
// Importer le fichier restaurant.json
// sur PC : Se mettre dans le dossier où il y l'executable mongoimport


// Combien y a-t-il de restaurants ?
db.restaurants.count()
// Identique à
db.restaurants.find().count()

// Trouver les restaurants qui sont dans la rue "Morris Park Ave"
db.restaurants.find({"address.street" : "Morris Park Ave"})
db.restaurants.find({"address.street" : "Morris Park Ave"}).count()
// Pour aussi récupérer ceux qui ont pour rue "Morris Park Avenue"
db.restaurants.find({"address.street" : "Morris Park Avenue"})
db.restaurants.find({"address.street" : "Morris Park Avenue"}).count()
// L'utilisation d'une regex permet de récupérer les 2 orthographes (et éventuellement les orthographes alternatives en minuscules avec le flag i(nsensitive) )
db.restaurants.find({"address.street" : /Morris Park Ave/i }).count()
// Combien y en-a-t-il ?

// Afficher uniquement (sans l'id) les champs quartier, type de cuisine et adresse
db.restaurants.find(
    {"address.street" : /Morris Park Ave/i },           //query
    { _id: 0, borough : 1, cuisine : 1, address : 1}    // projection    
)

// Trouver la liste des restaurants situés à Staten Island qui font des hamburgers OU de la boulangerie.
// Avec un $or
db.restaurants.find(
    {
        $and : 
            [
                { borough: "Staten Island" },
                {
                    $or : 
                        [
                            { cuisine : "Hamburgers" },
                            { cuisine : "Bakery"}
                        ]
                }
            ]
    })
// Avec le $and implicite
db.restaurants.find(
    { 
        borough: "Staten Island" ,
        $or : 
            [
                { cuisine : "Hamburgers" },
                { cuisine : "Bakery"}
            ]
    })
// Avec un $in
db.restaurants.find(
    { 
        borough: "Staten Island" ,
        cuisine : { $in : [ "Hamburgers","Bakery"]}
    })
// avec une regex
    db.restaurants.find(
        { 
            borough: "Staten Island" ,
            cuisine : { $in : [ /hamburger/i,/bakery/i]}
        })

// La variable restaurants est un objet. Dans mongo, ils appellent cela un curseur...
var restaurants = db.restaurants.find().limit(50)

// Parcours d'un curseur avec un while
var restaurants = db.restaurants.find().limit(50)
while (restaurants.hasNext()) {
    printjson(restaurants.next());
 }

// Parcours d'un curseur avec un foreach
var restaurants = db.restaurants.find().limit(50)

restaurants.forEach( function(restaurant){
    print(restaurant.name);
})

// En utilisant une fonction flèche
var restaurants = db.restaurants.find().limit(50)

restaurants.forEach( restaurant =>{
    print(restaurant.name);
})

// Quel est le type de restaurant le plus présent ?
// Vous pouvez le faire en vanillaJS

// Autre méthode. Plus élégante ??
// C'est le pipeline d'aggregation


// Pour limiter aux restos de Staten Island

